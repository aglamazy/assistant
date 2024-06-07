export enum ResponseCodes {
    UserActiveTryToLogin = "UserActiveTryToLogin",
    UserNeedToWaitToSendAgain = "UserNeedToWaitToSendAgain",
    InvalidOrExpiredToken = 'InvalidOrExpiredToken',
    LoginFailed = 'LoginFailed'
}

export interface IConflictData {
    success: false,
    message: string,
    code: ResponseCodes
}