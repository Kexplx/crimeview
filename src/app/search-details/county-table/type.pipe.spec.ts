import { TypePipe } from './type.pipe';
const countyTypePipe = new TypePipe();

describe('#transform', () => {
  it('should return "LK" for type "Landkreis"', () => {
    const type = 'Landkreis';
    const result = countyTypePipe.transform(type);

    expect(result).toEqual('LK');
  });

  it('should return "KFS" for type "Kreisfreie Stadt"', () => {
    const type = 'Kreisfreie Stadt';
    const result = countyTypePipe.transform(type);

    expect(result).toEqual('KfS');
  });

  it('should return "K" for type "Kreis"', () => {
    const type = 'Kreis';
    const result = countyTypePipe.transform(type);

    expect(result).toEqual('K');
  });
});
