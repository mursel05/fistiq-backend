export interface RequestWithAuth extends Request {
  user: {
    id: number;
  };
}
