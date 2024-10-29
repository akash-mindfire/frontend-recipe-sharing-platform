interface RegisterResponse {
  _id: string;
  name: string;
  email: string;
  role: string;
}

interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

interface LoginResponse {
  data: {
    accessToken: string;
    user: User;
  };
}

interface User {
  name: string;
  email: string;
  role: string;
  _id: string;
}

interface LoginRequest {
  email: string;
  password: string;
}
