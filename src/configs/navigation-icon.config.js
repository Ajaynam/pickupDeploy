import React from 'react'
import {
    HiOutlineChartSquareBar,
    HiOutlineUserGroup,
    HiOutlineTrendingUp,
    HiOutlineUserCircle,
    HiOutlineBookOpen,
    HiOutlineCurrencyDollar,
    HiOutlineShieldCheck,
    HiOutlineColorSwatch,
    HiOutlineChatAlt,
    HiOutlineDesktopComputer,
    HiOutlinePaperAirplane,
    HiOutlineChartPie,
    HiOutlineUserAdd,
    HiOutlineKey,
    HiOutlineBan,
    HiOutlineHand,
    HiOutlineDocumentText,
    HiOutlineTemplate,
    HiOutlineLockClosed,
    HiOutlineDocumentDuplicate,
    HiOutlineViewGridAdd,
    HiOutlineShare,
    HiOutlineVariable,
    HiOutlineCode,
    HiOutlineUsers,
} from 'react-icons/hi'
import { RxDashboard } from 'react-icons/rx'
import { TbMoneybag, TbBrandProducthunt, TbHistory, TbTruckDelivery } from 'react-icons/tb'
import { VscGitPullRequest,VscGift } from 'react-icons/vsc'
import { BsArrowDown,BsCardChecklist,BsList } from 'react-icons/bs'
import { AiOutlineBranches } from 'react-icons/ai'
import { CiBoxes, CiMoneyCheck1, CiSettings } from 'react-icons/ci'
import { RiArrowUpDownLine } from 'react-icons/ri'
import { GiFamilyTree } from 'react-icons/gi'
import { TbPigMoney } from 'react-icons/tb'


const navigationIcon = {
    apps: <HiOutlineViewGridAdd />,
    project: <HiOutlineChartSquareBar />,
    crm: <HiOutlineUserGroup />,
    sales: <HiOutlineTrendingUp />,
    crypto: <HiOutlineCurrencyDollar />,
    knowledgeBase: <HiOutlineBookOpen />,
    account: <HiOutlineUserCircle />,
    uiComponents: <HiOutlineTemplate />,
    common: <HiOutlineColorSwatch />,
    feedback: <HiOutlineChatAlt />,
    dataDisplay: <HiOutlineDesktopComputer />,
    forms: <HiOutlineDocumentText />,
    navigation: <HiOutlinePaperAirplane />,
    graph: <HiOutlineChartPie />,
    authentication: <HiOutlineLockClosed />,
    signIn: <HiOutlineShieldCheck />,
    signUp: <HiOutlineUserAdd />,
    forgotPassword: <HiOutlineLockClosed />,
    resetPassword: <HiOutlineKey />,
    pages: <HiOutlineDocumentDuplicate />,
    welcome: <HiOutlineHand />,
    accessDenied: <HiOutlineBan />,
    guide: <HiOutlineBookOpen />,
    documentation: <HiOutlineDocumentText />,
    sharedComponentDoc: <HiOutlineShare />,
    utilsDoc: <HiOutlineVariable />,
    changeLog: <HiOutlineCode />,
    dashboard: <RxDashboard />,
    user: <HiOutlineUsers />,
    payout: <TbMoneybag />,
    product: <CiBoxes />,
    request: <VscGitPullRequest />,
    history: <TbHistory />,
    direct: <BsArrowDown />,
    level: <AiOutlineBranches />,
    reward: <VscGift />,
    income: <CiMoneyCheck1 />,
    downline: <RiArrowUpDownLine />,
    order: <TbTruckDelivery />,
    orderList:<BsCardChecklist/>,
    list: <BsList />,
    withdraw: <TbPigMoney />,
    setting:<CiSettings/>
}

export default navigationIcon
