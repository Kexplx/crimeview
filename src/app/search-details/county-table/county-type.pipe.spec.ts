import { CountyTypePipe } from './county-type.pipe';
const countyTypePipe = new CountyTypePipe();

describe('#transform', () => {
  it('should return "LK" for type "Landkreis"', () => {
    const type = 'Landkreis';
    const result = countyTypePipe.transform(type);

    expect(result).toEqual('LK');
  });

  it('should return "KFS" for type "Kreisfreihe Stadt"', () => {
    const type = 'Kreisfreihe Stadt';
    const result = countyTypePipe.transform(type);

    expect(result).toEqual('KFS');
  });
});
