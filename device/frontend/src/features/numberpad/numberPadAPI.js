// A mock function to mimic making an async request for data
export function fetchNumberPad(amount = 1) {
    return new Promise((resolve) =>
      setTimeout(() => resolve({ data: amount }), 700)
    );
  }
  