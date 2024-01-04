import moment from "moment";

class MomentClient {
  getDeleteTime(date: number) {
    return moment(date).toISOString();
  }
}

export const momentClient = new MomentClient();
