import { client } from "../db";

//
class TransactionWithRetry {
  constructor() {
    this.retries = 0;
    this.session = client?.startSession();
  }
  run = async operation => {
    this.operation = operation;
    try {
      if (this.retries >= 3) throw new Error("Could not complete transcation");
      return await this.operation(this);
    } catch (error) {
      return await this.retry(error);
    }
  };
  retry = async error => {
    if (error?.errorLabels?.indexOf("TransientTransactionError") >= 0) {
      this.retries = retries += 1;
      await this.run(this.operation);
    } else {
      throw error;
    }
  };
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

export default TransactionWithRetry;
