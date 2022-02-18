import supertest from 'supertest';
import app from '../index';
import fs from 'fs';
import { myResizeFunc } from '../controller/imageResizer';
const request = supertest(app);

describe('Test endpoint /api/image', () => {
  const fileName = 'wall';
  const extention = '.jpg';
  const width = 700;
  const height = 500;
  it('it excpect that not throw any error when resizing the image', async (): Promise<void> => {
    const image = fs.readFileSync(`./assets/full/${fileName}${extention}`);
    console.log(
      await myResizeFunc(`${fileName}${extention}`, image, width, height)
    );
    expect(async () => {
      await myResizeFunc(`${fileName}${extention}`, image, width, height);
    }).not.toThrow();
  });
  it('it excpect that response.status toEqual 404 if image not exist', async (): Promise<void> => {
    const response = await request.get(
      `/api/image?namefile=${fileName}&width=${width}&height=${height}`
    );
    expect(response.status).toEqual(404);
    expect(response.text).toEqual('there is problem with reading image');
  });

  it('it excpect that response.status toEqual 304 if image exist and alrready processed', async (): Promise<void> => {
    const response = await request.get(
      `/api/image?namefile=${fileName}&width=${width}&height=${height}`
    );
    if (response.get('isModified') == 'true') {
      expect(response.status).toEqual(304);
    } else {
      expect(response.status).not.toEqual(304);
    }
  });

  it('it excpect that response.status toEqual 201 if image is created and not processed before', async (): Promise<void> => {
    const response = await request.get(
      `/api/image?namefile=${fileName}&width=${width}&height=${height}`
    );
    if (response.get('isModified') == 'true') {
      expect(response.status).toEqual(304);
      return;
    }
    if (response.get('isCreated') == 'true') {
      expect(response.status).toEqual(201);
    } else {
      expect(response.status).toEqual(404 || 400);
    }
  });
});
