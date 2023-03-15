import { Pool, ResultSetHeader, RowDataPacket } from 'mysql2/promise';
import { User, UserDetails } from '../interfaces/user.interface';

export default class UserModel {
  public connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public async getByUsername(username: string): Promise<UserDetails> {
    const result = await this.connection.execute<RowDataPacket[]>(`
      SELECT id, username, vocation, level, password
      FROM Trybesmith.users WHERE username = ?;
    `, [username]);

    const [[user]] = result;

    return user as UserDetails;
  }

  public async create(user: User): Promise<UserDetails> {
    const { username, vocation, level, password } = user;

    const result = await this.connection.execute<ResultSetHeader>(`
      INSERT INTO Trybesmith.users
      (username, vocation, level, password)
      VALUES (?, ?, ?, ?);
    `, [username, vocation, level, password]);

    const [{ insertId }] = result;

    return { id: insertId, username, vocation, level };
  }
}