const jsonServer = require("json-server");
const cloneDeep = require("lodash.clonedeep");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

let clonedScores = [];

const scoresCloner = (req, res, next) => {
  clonedScores = cloneDeep(router.db.get("scores").valueOf());
  next();
};

const checkScores = () => {
  const newScores = router.db.get("scores").valueOf();
  const examStudentIdPairs = {};
  newScores.forEach(s => {
    const examStudentIdPairKey = `${s.examId}${s.studentId}`;
    if (examStudentIdPairs[examStudentIdPairKey]) {
      router.db.set("scores", clonedScores).write();
      throw new Error(
        `A score with examId ${s.examId} and studentId ${s.studentId} already exists!`
      );
    }
    examStudentIdPairs[examStudentIdPairKey] = true;
  });
};

router.render = (req, res) => {
  checkScores();
  res.jsonp(res.locals.data);
};

// Add custom middleware before JSON Server router
server.use(middlewares);
server.use(scoresCloner);
server.use(router);
server.listen(4000, () => {
  console.log("JSON Server is running on port 4000");
});
