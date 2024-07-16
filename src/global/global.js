// const apiURL = "http://192.168.14.110:" // 平安部署对接
// const apiURL = "http://219.223.193.7:" // 本地大电脑
// const apiURL = "http://localhost:" // 本地新电脑
const apiURL = "http://10.113.24.19:8703" // 本地大电脑后端ip
 
const JFname="703" // 默认202机房
const ports = {'703':'8703'} // 不同机房端口不同，不同机房分别占用一个端口
const roles = {'normal':'普通用户','operator':'运维人员','root':'超管员'}
const rolesVarse = {"普通用户":'normal',"运维人员":'operator',"超管员":'root'}
const warnNum=0

const JF201=[
    {
        fwqid:1,
        fwqLeft:"A",
        fwdLeftindex:0,
        fwqRight:"B",
        fwdrightindex:1,
        ktTop:[1],
        ktBottom:[],
    },
    {
        fwqid:2,
        fwqLeft:'C',
        fwdLeftindex:2,
        fwqRight:'D',
        fwdrightindex:3,
        ktTop:[2,3],
        ktBottom:[],
    },
    {
        fwqid:3,
        fwqLeft:'E',
        fwdLeftindex:4,
        fwqRight:'F',
        fwdrightindex:5,
        ktTop:[4],
        ktBottom:[],
    },
    {
        fwqid:4,
        fwqLeft:'G',
        fwdLeftindex:6,
        fwqRight:'H',
        fwdrightindex:7,
        ktTop:[5,6],
        ktBottom:[],
    }
]
const JF202=[
    {
        fwqid:1,
        fwqLeft:"A",
        fwdLeftindex:0,
        fwqRight:"B",
        fwdrightindex:1,
        ktTop:[12],
        ktBottom:[20,19],
    },
    {
        fwqid:2,
        fwqLeft:'C',
        fwdLeftindex:2,
        fwqRight:'D',
        fwdrightindex:3,
        ktTop:[11,10],
        ktBottom:[18],
    },
    {
        fwqid:3,
        fwqLeft:'E',
        fwdLeftindex:4,
        fwqRight:'F',
        fwdrightindex:5,
        ktTop:[9,8],
        ktBottom:[17],
    },
    {
        fwqid:4,
        fwqLeft:'G',
        fwdLeftindex:6,
        fwqRight:'H',
        fwdrightindex:7,
        ktTop:[7,6],
        ktBottom:[16],
    },
    {
        fwqid:5,
        fwqLeft:'J',
        fwdLeftindex:8,
        fwqRight:'K',
        fwdrightindex:9,
        ktTop:[5,4],
        ktBottom:[15],
    },
    {
        fwqid:6,
        fwqLeft:'L',
        fwdLeftindex:10,
        fwqRight:'M',
        fwdrightindex:11,
        ktTop:[3],
        ktBottom:[14],
    },
    {
        fwqid:7,
        fwqLeft:'N',
        fwdLeftindex:12,
        fwqRight:'P',
        fwdrightindex:13,
        ktTop:[2,1],
        ktBottom:[13],
    },
]
const JF203=[
    {
        fwqid:1,
        fwqLeft:"A",
        fwdLeftindex:0,
        fwqRight:"B",
        fwdrightindex:1,
        ktTop:[13],
        ktBottom:[7],
    },
    {
        fwqid:2,
        fwqLeft:'C',
        fwdLeftindex:2,
        fwqRight:'D',
        fwdrightindex:3,
        ktTop:[12,11],
        ktBottom:[6],
    },
    {
        fwqid:3,
        fwqLeft:'E',
        fwdLeftindex:4,
        fwqRight:'F',
        fwdrightindex:5,
        ktTop:[10],
        ktBottom:[5,4],
    },
    {
        fwqid:4,
        fwqLeft:'G',
        fwdLeftindex:6,
        fwqRight:'H',
        fwdrightindex:7,
        ktTop:[9],
        ktBottom:[3],
    },
    {
        fwqid:5,
        fwqLeft:'J',
        fwdLeftindex:8,
        fwqRight:'K',
        fwdrightindex:9,
        ktTop:[8],
        ktBottom:[2,1],
    }
]
const JF204=[
    {
        fwqid:1,
        fwqLeft:"A",
        fwdLeftindex:0,
        fwqRight:"B",
        fwdrightindex:1,
        ktTop:[1],
        ktBottom:[13],
    },
    {
        fwqid:2,
        fwqLeft:'C',
        fwdLeftindex:2,
        fwqRight:'D',
        fwdrightindex:3,
        ktTop:[2,3],
        ktBottom:[14],
    },
    {
        fwqid:3,
        fwqLeft:'E',
        fwdLeftindex:4,
        fwqRight:'F',
        fwdrightindex:5,
        ktTop:[4,5],
        ktBottom:[15],
    },
    {
        fwqid:4,
        fwqLeft:'G',
        fwdLeftindex:6,
        fwqRight:'H',
        fwdrightindex:7,
        ktTop:[6,7],
        ktBottom:[16],
    },
    {
        fwqid:5,
        fwqLeft:'J',
        fwdLeftindex:8,
        fwqRight:'K',
        fwdrightindex:9,
        ktTop:[8,9],
        ktBottom:[17],
    },
    {
        fwqid:6,
        fwqLeft:'L',
        fwdLeftindex:10,
        fwqRight:'M',
        fwdrightindex:11,
        ktTop:[10,11],
        ktBottom:[18],
    },
    {
        fwqid:7,
        fwqLeft:'N',
        fwdLeftindex:12,
        fwqRight:'P',
        fwdrightindex:13,
        ktTop:[12],
        ktBottom:[19,20],
    },
]
const JF205=[
    {
        fwqid:1,
        fwqLeft:"A",
        fwdLeftindex:0,
        fwqRight:"B",
        fwdrightindex:1,
        ktTop:[10],
        ktBottom:[1],
    },
    {
        fwqid:2,
        fwqLeft:'C',
        fwdLeftindex:2,
        fwqRight:'D',
        fwdrightindex:3,
        ktTop:[11],
        ktBottom:[2,3],
    },
    {
        fwqid:3,
        fwqLeft:'E',
        fwdLeftindex:4,
        fwqRight:'F',
        fwdrightindex:5,
        ktTop:[12],
        ktBottom:[4,5],
    },
    {
        fwqid:4,
        fwqLeft:'G',
        fwdLeftindex:6,
        fwqRight:'H',
        fwdrightindex:7,
        ktTop:[13,14],
        ktBottom:[6],
    },
    {
        fwqid:5,
        fwqLeft:'J',
        fwdLeftindex:8,
        fwqRight:'K',
        fwdrightindex:9,
        ktTop:[15],
        ktBottom:[7],
    },
    {
        fwqid:6,
        fwqLeft:'L',
        fwdLeftindex:10,
        fwqRight:'M',
        fwdrightindex:11,
        ktTop:[16],
        ktBottom:[8,9],
    }
]
const JF201FWQlist = ['A','B','C','D','E','F','G','H']
const JF201FWQ = ['AB','CD','EF','GH']
const JF202FWQlist = ['A','B','C','D','E','F','G','H','J','K','L','M','N','P']
const JF202FWQ = ['AB','CD','EF','GH','JK','LM','NP']
const JF203FWQlist = ['A','B','C','D','E','F','G','H','J','K']
const JF203FWQ = ['AB','CD','EF','GH','JK']
const JF204FWQlist = ['A','B','C','D','E','F','G','H','J','K','L','M','N','P']
const JF204FWQ = ['AB','CD','EF','GH','JK','LM','NP']
const JF205FWQlist = ['A','B','C','D','E','F','G','H','J','K','L','M']
const JF205FWQ = ['AB','CD','EF','GH','JK','LM']
const JF201KTnum = 6
const JF202KTnum = 20
const JF203KTnum = 13
const JF204KTnum = 20
const JF205KTnum = 16
const AZ2sound={'A':"诶一",'B':"逼",'C':"洗",'D':"地",'E':"一",'F':"诶富",'G':"鸡",'H':"诶吃",'J':'截','K':"剋",'L':"诶勒",'M':"诶姆",'N':"恩",'P':"披"}


const header={
        headers:{
                    "Access-Control-Allow-Origin":"*",
                    "Access-Control-Allow-Credentials":"true",
                    "Access-Control-Allow-Methods":"POST, GET, PUT, OPTIONS, DELETE, PATCH",
                    "Access-Control-Max-Age":"3600",
                    "Access-Control-Allow-Headers":"content-type"
    }
}


export default{
    apiURL,
    warnNum,
    roles,
    rolesVarse,
    ports,
    JFname,
    JF201,
    JF201FWQ,
    JF201FWQlist,
    JF202,
    JF202FWQ,
    JF202FWQlist,
    JF203,
    JF203FWQ,
    JF203FWQlist,
    JF204,
    JF204FWQ,
    JF204FWQlist,
    JF205,
    JF205FWQ,
    JF205FWQlist,
    JF201KTnum,
    JF202KTnum,
    JF203KTnum,
    JF204KTnum,
    JF205KTnum,
    header,
    AZ2sound,
}