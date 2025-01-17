import { client } from "../db";

class Transaction {
  constructor() {
    this.session = client?.startSession();
  }
  getSession = () => this.session;
  start = async () => {
    try {
      await this.session?.startTransaction({
        readConcern: { level: "snapshot" },
        writeConcern: { w: "majority" },
        readPreference: "primary"
      });
    } catch (error) {}
  };
  commit = async () => {
    try {
      await this.session?.commitTransaction();
    } catch (error) {
      if (error?.errorLabels?.indexOf("UnknownTransactionCommitResult") >= 0) {
        this.session?.commitTransaction();
      } else {
        throw new Error(error);
      }
    }
  };
  end = async () => {
    try {
      await this.session?.endSession();
    } catch (error) {}
  };
}

export default Transaction;
