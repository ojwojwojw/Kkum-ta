const express = require("express");
const Global = require("../global");
const logRouter = express.Router();

(async () => {
  logService = await Global.getLogService();
  userRepository = await Global.getUserRepository();
  logRepository = await Global.getLogRepository();
  deviceRepository = await Global.getDeviceRepository();
})();
/**
 * @swagger
 * /log/{user_id}/{group_id}?date={date}&hour={hour}:
 *      get:
 *          summary: 특정 한 시간동안 동작한 비율을 가져온다.
 *          description: "date 날짜의 hour:00:00부터 hour:59:59.999까지의<br>동작 시간 비율을 가져온다."
 *          tags: [Logging]
 *          parameters:
 *            - in: path
 *              name: user_id
 *              schema:
 *                type: string
 *                example: "test_user"
 *              required: true
 *              description: 유저 로그인 ID
 *            - in: path
 *              name: group_id
 *              schema:
 *                  type: integer
 *                  example: "0"
 *              required: true
 *              description: 그룹 번호(0~4)
 *            - in: query
 *              name: date
 *              schema:
 *                  type: string
 *                  example: "2023-01-01"
 *              required: true
 *              description: "로그를 가져올 날짜"
 *            - in: query
 *              name: hour
 *              schema:
 *                  type: integer
 *                  example: 0
 *              required: true
 *              description: "로그를 가져올 시간대(2: 오전 2시~오전 3시)(0~23)"
 *          responses:
 *              200:
 *                  description: "해당 시간에 타이머가 동작한 비율을 가져온다(단위: 시간)"
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: number
 *                              example: 0.24995634770985653
 */
/**
 * @swagger
 * /log/{user_id}/{group_id}?date={date}:
 *      get:
 *          summary: 특정한 날 동안 동작한 비율을 가져온다.
 *          description: "date 날짜의 매 시간 동작 시간 비율을 가져온다."
 *          tags: [Logging]
 *          parameters:
 *            - in: path
 *              name: user_id
 *              schema:
 *                type: string
 *                example: "test_user"
 *              required: true
 *              description: 유저 로그인 ID
 *            - in: path
 *              name: group_id
 *              schema:
 *                  type: integer
 *                  example: "0"
 *              required: true
 *              description: "그룹 번호(0~4)"
 *            - in: query
 *              name: date
 *              schema:
 *                  type: string
 *                  example: "2023-01-01"
 *              required: true
 *              description: 로그를 가져올 날짜
 *          responses:
 *              200:
 *                  description: "해당 시간에 타이머가 동작한 비율을 배열로 가져온다(단위: 시간, 길이=24)"
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  type: number
 *                              example: [0.47932100664505795,0.49100793308917545,0.888990508659109,0.5764130417552653,0.3688904263336612,0.5131601461876316,0.45739908896502723,0.8628037174469414,0.02749093572741801,0.3140875750713683,0.4167036105874584,0.994327755778184,0.7600355551998024,0.7248297359685414,0.14012531598698308,0.8229266744932462,0.05044901260103041,0.8912074837847415,0.41656369084292644,0.3167203513750505,0.9797699159922852,0.8419499976098102,0.8158149707616225,0.9416216566990658]
 *
 */
/**
 * @swagger
 * /log/{user_id}/{group_id}?month={month}:
 *      get:
 *          summary: 특정 한 달동안 매일 타이머가 동작한 비율을 가져온다.
 *          description: "month 달의 매일 0시~23:59:59까지의<br>동작 시간 비율을 가져온다."
 *          tags: [Logging]
 *          parameters:
 *            - in: path
 *              name: user_id
 *              schema:
 *                type: string
 *                example: "test_user"
 *              required: true
 *              description: 유저 로그인 ID
 *            - in: path
 *              name: group_id
 *              schema:
 *                  type: integer
 *                  example: "0"
 *              required: true
 *              description: 그룹 번호(0~4)
 *            - in: query
 *              name: month
 *              schema:
 *                  type: string
 *                  example: "2023-01"
 *              required: true
 *              description: "로그를 가져올 달"
 *          responses:
 *              200:
 *                  description: "각 날에 타이머가 동작한 비율을 가져온다(단위: 일)"
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  type: number
 *                              example: [0.3713558493604481,0.7663578016666024,0.42219686098622833,0.652360684770156,0.14361106597038664,0.6706747005004734,0.5001778674650836,0.1330261275669189,0.052232466337744254,0.8306446056596077,0.6032163219461699,0.8525430655738055,0.6208835685942531,0.47596004485032894,0.34519824360205,0.67693991065166,0.2859309595800832,0.788337251944768,0.3865463594380474,0.4533941593058277,0.6012321184666833,0.9099029326260566,0.41827250741868904,0.30345926355822606,0.09941592803653942,0.7327246588232463,0.21478409511612861,0.5152317353235696,0.02574785964156212,0.753912838382343,0.4935959250636399]
 */
/**
 * @swagger
 * /log/{user_id}/{group_id}?year={year}:
 *      get:
 *          summary: 특정 한 해동안 매일 타이머가 동작한 비율을 가져온다.
 *          description: "year 해의 매일 0시~23:59:59까지의<br>동작 시간 비율을 가져온다."
 *          tags: [Logging]
 *          parameters:
 *            - in: path
 *              name: user_id
 *              schema:
 *                type: string
 *                example: "test_user"
 *              required: true
 *              description: 유저 로그인 ID
 *            - in: path
 *              name: group_id
 *              schema:
 *                  type: integer
 *                  example: "0"
 *              required: true
 *              description: 그룹 번호(0~4)
 *            - in: query
 *              name: year
 *              schema:
 *                  type: string
 *                  example: "2023"
 *              required: true
 *              description: "로그를 가져올 해"
 *          responses:
 *              200:
 *                  description: "각 날에 타이머가 동작한 비율을 가져온다(단위: 일)"
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  type: number
 *                              example: [0.5280711565193084,0.6911671100449965,0.5314482151645628,0.6997740919920816,0.21914601474681072,0.6861674955970953,0.528306968768814,0.7798800390186205,0.6148651679959174,0.6528656472872061,0.6878572154428919,0.3136446808900204,0.7048079167477044,0.05505286632033646,0.5423251617106937,0.4733829488650232,0.11427807003820778,0.3372578854768338,0.8452143162867927,0.44027554930083235,0.7061768901226382,0.3397966113433095,0.07429384495561875,0.5777845187432118,0.7612843821089867,0.13460319652100927,0.5399871369194993,0.2723069107095306,0.23081743187459258,0.5334464265851047,0.9955408932923251,0.6081912433262866,0.22250680514782606,0.49914119975387505,0.8274178006104738,0.029325922761259227,0.2641509286173649,0.5234296032610635,0.30261093894583735,0.7742455074258234,0.826735895548482,0.1540211676581733,0.41557653186165666,0.30180513872968895,0.15811229467042143,0.273884789618853,0.7257056048269761,0.8635330362203064,0.1366899340236587,0.780710961761196,0.6502565459049154,0.5713914576574546,0.9801628360772465,0.5117453242070251,0.5441708502561757,0.8656436008562849,0.7720905036904084,0.36402610179666905,0.38492893898653335,0.15744820095262124,0.6571244868069497,0.9671596846898178,0.1548808179957355,0.9713523577000156,0.8208649219751791,0.30473046216592037,0.9518877787199929,0.04132815786601585,0.7576326396353703,0.4605301313666095,0.6190633971342641,0.9273120197387554,0.7623539791515734,0.3173283932001887,0.2258355225310269,0.7498308229713222,0.6777024470959074,0.755922415783354,0.49881578390269676,0.39867053563897903,0.5117734199133706,0.4847869393822539,0.9042555207349752,0.24306400370285353,0.934377338022484,0.5663420269002664,0.9881683006828308,0.8486122736899433,0.358324229013407,0.8429696957047697,0.45618271490067497,0.546067256858795,0.09092019883524793,0.15015873079591335,0.7175152928562853,0.029484699632800204,0.1978847396304757,0.8774943153979471,0.045923692076329736,0.7382221629932602,0.8369348503119938,0.30547560963702325,0.1020510803549799,0.5570872847725705,0.5772618090166244,0.24685551338877643,0.4883887553330595,0.6193510129725108,0.9152319476817745,0.5508599252287922,0.17330804983131243,0.8086048878470187,0.6701010804802028,0.9849272485280882,0.3086342926490919,0.8197478516890317,0.13277241547853302,0.5941488036150662,0.5497859964851206,0.3339400598087414,0.26338238766531075,0.27276782121776955,0.8374568004410994,0.10800503126017613,0.8358710508641185,0.2857926522633569,0.1397213633583272,0.5987971963613952,0.9988881671915624,0.0736239497288178,0.14296207296042418,0.08755387373429402,0.877398112057499,0.42877764775928684,0.5466712744302396,0.039160480811701204,0.9287641552363222,0.40844614025725257,0.6505246328963155,0.42586644134069607,0.4991293793060101,0.9625850788590113,0.9752347990973977,0.4570315455840017,0.16825290384100144,0.3268688981172163,0.13554410359217894,0.7298304791488144,0.27055130766480673,0.856283681761665,0.24626465211040993,0.19341860233868635,0.45152693852936454,0.15622930504128285,0.41927984321255307,0.8152758610058708,0.8508894900801227,0.12004197755067958,0.7771419294191684,0.6231177187530412,0.8830653109596325,0.4912047386962046,0.7376569674676217,0.5576663388271061,0.12271370621986688,0.06559854810310428,0.5789629945499521,0.5628224708645622,0.18287899109943928,0.5957229315628847,0.0033098117143486316,0.6980128488086261,0.7461218896379493,0.4198295356633568,0.5635227282678448,0.990291837008598,0.5303355353042145,0.3538239155093137,0.8882979444301022,0.3353681471957737,0.9565911602087624,0.8425459221630338,0.6260997667454613,0.36312570192410765,0.87685109524491,0.18293649812435708,0.2281728930617224,0.20290844014403708,0.6497251053815756,0.008960913835188933,0.6753681939946812,0.11169143869521125,0.7351795492136497,0.9631998940447037,0.7150006283384025,0.6247594200214623,0.12527728495527435,0.8270381001540026,0.4458395845869785,0.5131584567794027,0.03292154942961756,0.12332970864574833,0.8882245964444364,0.7034887414912281,0.8101117127046809,0.2075816757578841,0.43254644655878605,0.12060323602185652,0.3809709632258751,0.9498910365886815,0.8735899091852899,0.5014302343228441,0.25711859677633786,0.47849759270602554,0.4992938360627621,0.6042928244524151,0.7223438460071321,0.21248329628035845,0.1747706691736155,0.23615648163154113,0.6093865096514468,0.21830088998604236,0.10262926745040102,0.720193455916101,0.4355957273366111,0.3345615279250911,0.644186093849588,0.05156361893670636,0.453128918005302,0.5809020910069698,0.7302589836900684,0.5729857370763021,0.92529520613107,0.978779616238902,0.5399673712857884,0.4796872187415624,0.5065370133881235,0.9587733811112107,0.08488397365097744,0.5155774816890533,0.8607902871928954,0.8151883553075738,0.5490513445734619,0.24374906828045706,0.3803628476886949,0.40747013290634393,0.4406442017617114,0.20533313419084176,0.761999431671935,0.6206465258148373,0.3585897713136392,0.711939863109021,0.993305139865835,0.4414797094877545,0.8345461315065676,0.35874772046862335,0.48507272562674686,0.20494438128018433,0.1611751770113239,0.5180341720844641,0.8020277472947155,0.4301583952377215,0.8824464393096583,0.4660234417457827,0.7445035167962601,0.7974067954205097,0.5450942484865262,0.8656006577397422,0.36637187555957884,0.11350662883347784,0.36244620198919675,0.729848024931826,0.75442745128439,0.7534277118209545,0.20813455644160328,0.4630897655835806,0.44621231499987557,0.320844690586622,0.20683551808750855,0.7931338166148316,0.10375581936068157,0.43325373503594133,0.9441211846858377,0.25460050928343736,0.960669073019079,0.8063022469480046,0.8206140890622773,0.6632475506931446,0.4373097513651012,0.3804276768838195,0.7326913722819437,0.7015535130257406,0.6213957774951149,0.09316006085198514,0.8499765774809702,0.2606899202759425,0.14247378677446854,0.16502348193071414,0.4255702955233007,0.9297134470203221,0.1989042386862656,0.14246725690104056,0.4795613793382574,0.5978132224233113,0.6123973722726703,0.22367861706761816,0.15946251775273845,0.2036881622432951,0.6621033798618632,0.8606602256459661,0.7145765739367589,0.8685570605515742,0.5808185320475834,0.7991446882913265,0.6333832712870242,0.769598951179693,0.28173956397191935,0.06845827243938563,0.8357012925385408,0.20958756740057383,0.08037816955194321,0.16881454457200462,0.699344104470464,0.41766571385090034,0.5682239870427033,0.24616357899490326,0.5478482406109351,0.8309463744588237,0.530207261087833,0.4829926680068759,0.7173619622985214,0.7440589007358229,0.828239782640914,0.007167747085379261,0.5317192514422773,0.38801120716295734,0.9435346251147712,0.6554292687609464,0.34769774194109915,0.8997887487357672,0.8693991162774173,0.40587155482956017,0.692345027015284,0.8337075727595498,0.3757635375411752,0.6896134642103013,0.9642563044933483,0.7690569770998814,0.00044419716219579186,0.3524602198872353,0.6327328662685237,0.556847865369462,0.6511086867399993,0.24281967712865016,0.5978425748364447,0.2370577582821245,0.9522316858178872,0.1912949083242801,0.9116316038945809,0.4391408758017834,0.3169872500828179,0.026360768799564616,0.3549596133071733,0.20741658353717174,0.4969502766616003]
 */

logRouter.get("/:user_id/:group_id", async (req, res) => {
  const user_id = req.params.user_id;
  const group_id = req.params.group_id;
  const hour = req.query.hour;
  const date = req.query.date;
  const month = req.query.month;
  const year = req.query.year;
  const user_key = (await userRepository.getUserById(user_id))?.user_key;
  if(!user_key === null){
    res.status(401).json({status: `Cannot find user(${user_id})`});
  }
  if (!!hour && !!date && !month && !year) {
    if(isNaN(parseInt(hour))){
      res.status(400).json({status:`Invalid hour(${hour})`});
    }
    else{
      res.status(200).json(await logService.hour(user_key, group_id, date, parseInt(hour)));
    }
    return;
  }
  if (!hour && !!date && !month && !year) {
    if(/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      res.status(200).json(await logService.date(user_key, group_id, date));
      return;
    }else{
      res.status(400).json({status: `Invalid date(${date})`});
      return;
    }
  }
  if (!hour && !date && !!month && !year) {
    if(/^\d{4}-\d{2}$/.test(month)) {
      res.status(200).json(await logService.month(user_key, group_id, month));
      return;
    }else{
      res.status(400).json({status:`invalid month(${month})`});
      return;
    }
  }
  if (!hour && !date && !month && !!year) {
    if(/^\d{4}$/.test(year)){
      res.status(200).json(await logService.year(user_key, group_id, parseInt(year)));
    }
    else{
      res.status(400).json({status: `invalid year(${year})`});
    }
    return;
  }
  res.status(400).json({status: `invalid operation`});
});
/**
 * @swagger
 * /log/{user_id}/{group_id}:
 *      post:
 *          summary: "사용자 ID를 기반으로 새로운 로그를 등록한다"
 *          description: "새로운 로그를 등록한다"
 *          tags: [Logging]
 *          parameters:
 *            - in: path
 *              name: user_id
 *              schema:
 *                type: string
 *                example: "test_user"
 *              required: true
 *              description: 유저 로그인 ID
 *            - in: path
 *              name: group_id
 *              schema:
 *                  type: integer
 *                  example: "0"
 *              required: true
 *              description: 그룹 번호(0~4)
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              type: object
 *                              properties:
 *                                  date:
 *                                      type: string
 *                                      example: "2023-01-01"
 *                                  hour:
 *                                      type: integer
 *                                      example: 0
 *                                  portion:
 *                                      type: number
 *                                      example: 0.5
 *          responses:
 *              200:
 *                  description: "타이머 데이터를 추가하는데 성공했다"
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  status:
 *                                      type: string
 *                                      example: "ok"
 *              403:
 *                  description: "해당하는 유저를 찾을 수 없다"
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  status:
 *                                      type: string
 *                                      example: "cannot find user with id (invalid_id)"
 */
logRouter.post("/:user_id/:group_id", async (req, res) => {
    const user_id = req.params.user_id;
    const group_key = parseInt(req.params.group_id);
    const user_key = (await userRepository.getUserById(user_id))?.user_key;
    if(!user_key){
        res.status(403).json({status: `cannot find user with id (${user_id})`});
        return;
    }
    if(Object.is(group_key, NaN) || group_key < 0 || group_key > 5){
        res.status(400).json({status: `invalid group_id(${req.params.group_id})`});
        return;
    }
    const logs = req.body.map((item)=>{
        return {user_key, group_key, ...item};
    });
    await logRepository.insertLogs(logs);
    res.status(200).json({status: "ok"});
    return;
});
/**
 * @swagger
 * /log/device/{device_serial}/{group_id}:
 *      post:
 *          summary: "디바이스 키를 기반으로 새로운 로그를 등록한다"
 *          description: "새로운 로그를 등록한다"
 *          tags: [Logging]
 *          parameters:
 *            - in: path
 *              name: device_serial
 *              schema:
 *                type: string
 *                example: "rWsC7m1B"
 *              required: true
 *              description: 디바이스 시리얼 키
 *            - in: path
 *              name: group_id
 *              schema:
 *                  type: integer
 *                  example: "0"
 *              required: true
 *              description: 그룹 번호(0~4)
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              type: object
 *                              properties:
 *                                  date:
 *                                      type: string
 *                                      example: "2023-01-01"
 *                                  hour:
 *                                      type: integer
 *                                      example: 0
 *                                  portion:
 *                                      type: number
 *                                      example: 0.5
 *          responses:
 *              200:
 *                  description: "타이머 데이터를 추가하는데 성공했다"
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  status:
 *                                      type: string
 *                                      example: "ok"
 *              403:
 *                  description: "디바이스에 연동된 사용자가 없다"
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  status:
 *                                      type: string
 *                                      example: "Cannot find any user with device key AzBe3t28"
 */
logRouter.post("/device/:device_serial/:group_id", async (req, res) => {
    const device_serial = req.params.device_serial;
    const group_key = parseInt(req.params.group_id);
    const user_key = (await userRepository.getUserByDeviceSerial(device_serial))?.user_key;
    if(!user_key){
        res.status(403).json({status: `cannot find user with device_serial (${device_serial})`});
        return;
    }
    if(Object.is(group_key, NaN) || group_key < 0 || group_key > 5){
        res.status(400).json({status: `invalid group_id(${req.params.group_id})`});
        return;
    }
    const logs = req.body.map((item)=>{
        return {user_key, group_key, ...item};
    });
    await logRepository.insertLogs(logs);
    res.status(200).json({status: "ok"});
    return;
});
module.exports = logRouter;
