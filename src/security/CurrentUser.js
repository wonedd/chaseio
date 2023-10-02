class CurrentUser {
  constructor() {
    this.token = null;
    this.username = null;
    this.id = null;
  }

  setToken(token) {
    this.token = token;
  }
  setUsername(username) {
    this.username = username;
  }
  setId(id) {
    this.id = id;
  }

  clear() {
    this.token = null;
    this.username = null;
    this.id = null;
  }
}

const currentUser = new CurrentUser();

export default currentUser;
