export interface User {
  idx: string;
  name: string;
  roomName: string;
  lastKnownPosition: { x: number; y: number };
  message: string;
}

export class UsersHandler {
  private users: User[] = [];

  public addUser(user: User) {
    user.name = user.name.trim().toLowerCase();
    user.roomName = user.roomName.trim().toLowerCase();

    const usersExist = this.users.find(
      (userFound) =>
        userFound.roomName === user.roomName && userFound.name === user.name
    );

    if (usersExist) {
      return { error: "username already exists" };
    }

    this.users.push(user);

    return { user };
  }

  public removeUser(idx: string) {
    this.users = this.users.filter((user) => user.idx !== idx);
  }

  public getUser(idx: string) {
    return this.users.find((user) => user.idx === idx);
  }

  public getUsersInRoom(roomName: string) {
    return this.users.filter((user) => user.roomName === roomName);
  }

  public findRoomNameById(idx: string) {
    return this.users.find((user) => user.idx === idx);
  }

  public updateUserPosition(idx: string, x: number, y: number) {
    if (!x && !y) return;

    const userIndex = this.users.findIndex((user) => user.idx === idx);

    const usersCopy = [...this.users];

    usersCopy[userIndex] = {
      ...this.users[userIndex],
      lastKnownPosition: {
        ...this.users[userIndex].lastKnownPosition,
        x: x,
        y: y,
      },
    };

    this.users = usersCopy;
  }
}
