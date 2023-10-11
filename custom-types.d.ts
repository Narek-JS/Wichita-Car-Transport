export{}
declare global {
    interface Array<T> {
      isEmpty(): boolean;
    }
    interface Number<T> {
      isOdd(): boolean;
      isEven(): boolean;
    }
}