import { client } from "../db";

class Transaction {
  constructor(operation) {
    this.session = client?.startSession();
    if (operation) {
      this.operation = operation;
      return this.run();
    }
  }
  run = async () => {
    try {
      return await this.operation(this);
    } catch (error) {
      return await this.retry(error);
    }
  };
  retry = async error => {
    if (error?.errorLabels?.indexOf("TransientTransactionError") >= 0) {
      await this.operation(this);
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

export default Transaction;
