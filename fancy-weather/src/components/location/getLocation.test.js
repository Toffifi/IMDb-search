// /* eslint-disable no-undef */
// import Location from './getLocation';
// import ErrorHandler from '../errorHandler';

// beforeEach(() => {
//   fetch.resetMocks();
// });

// test('Opencagedata api call test', () => {
//   fetch.mockResponseOnce(JSON.stringify(
//     [
//       {
//         components: {
//           'ISO_3166-1_alpha-2': 'BY',
//           'ISO_3166-1_alpha-3': 'BLR',
//           building: 'Исторический факультет БГУ',
//           city: 'Минск',
//           city_district: 'Ленинский район',
//           continent: 'Europe',
//           country: 'Беларусь',
//           country_code: 'by',
//           house_number: '6',
//           neighbourhood: 'Ляховская Слобода',
//           postcode: '220030',
//           road: 'Красноармейская улица',
//           _category: 'building',
//           _type: 'building',
//         },
//       },
//     ],
//   ));

//   const mockPlaySoundFile = jest.fn();
//   jest.mock('../errorHandler', () => {
//     return jest.fn().mockImplementation(() => {
//       return { playSoundFile: mockPlaySoundFile };
//     });
//   });
//   const div = document.createElement('div');
//   const location = new Location(null, null, div, null, null, null, null );
//   return model.getTranslation('мечта поэта').then((res) => expect(res).toBe("the poet's dream"));
// });
