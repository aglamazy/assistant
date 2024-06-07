export enum ResponseCodes {
    UserActiveTryToLogin = "UserActiveTryToLogin",
    UserNeedToWaitToSendAgain = "UserNeedToWaitToSendAgain",
    InvalidOrExpiredToken = 'InvalidOrExpiredToken'
}

export interface IConflictData {
    success: false,
    message: string,
    code: ResponseCodes
}