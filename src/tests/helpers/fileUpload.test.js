import cloudinary from 'cloudinary';
import { fileUpload } from '../../helpers/fileUpload';

cloudinary.config({ 
  cloud_name: 'dz8s8db6p', 
  api_key: '828548223517523', 
  api_secret: 'fQTXTsEi2X9VjGTDlptlxNsZdRY',
  secure: true
});

describe('Pruebas en fileUpload', () => {

  test('debe de cargar un archivo y retornar el URL', async () => {
    const resp = await fetch('https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png');
    const blob = await resp.blob();

    const file = new File([blob], 'foto.png');
    const url = await fileUpload(file);

    expect(typeof url).toBe('string');

    const segments = url.split('/');
    const imgId = segments[segments.length - 1].replace('.png','');

    await  cloudinary.v2.api.delete_resources(imgId, {}, ()=>{
      // done();
    });
  });

  test('debe de retornar un error', async () => {
    const file = new File([], 'foto.png');
    const url = await fileUpload(file);

    expect(url).toBe(null);
  }); 

});
