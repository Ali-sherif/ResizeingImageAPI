import supertest from 'supertest';
import app from '../index';
const request = supertest(app);

describe('Test the root directory /', () => {
  it('it excpect that response.status toEqual 200', async (): Promise<void> => {
    const response = await request.get('/');
    expect(response.status).toBe(200);
  });

  it('it excpect that response.text toEqual sever runnig on port 3000', async (): Promise<void> => {
    const response = await request.get('/');
    expect(response.text).toEqual('sever runnig on port 3000');
  });

  it('it excpect that response.files toBeUndefined', async (): Promise<void> => {
    const response = await request.get('/');
    expect(response.files).toBeUndefined();
  });
});
