using models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;

namespace convert_data
{
    class Program
    {
        static void Main(string[] args)
        {
            var dd = new Dictionary<string, List<Set>>();
            foreach (var file in Directory.GetFiles("data/", "*.csv"))
            {
                var year = int.Parse(file.Replace("data/BKA-", "").Replace(".csv", ""));
                using (var reader = new StreamReader(file, Encoding.GetEncoding("iso-8859-1"), true))
                {
                    reader.ReadLine();
                    reader.ReadLine();
                    while (!reader.EndOfStream)
                    {
                        var line = reader.ReadLine();
                        var values = line.Split(';');

                        if (dd.ContainsKey(values[2]))
                        {
                            dd[values[2]].Add(new Set { Year = year, CrimeType = values[1], Count = int.Parse(values[5].Replace(",", "")), CountAverage = int.Parse(values[6].Replace(",", "")) });
                        }
                        else
                        {
                            dd.Add(values[2], new List<Set> { new Set { Year = year, CrimeType = values[1], Count = int.Parse(values[5].Replace(",", "")), CountAverage = int.Parse(values[6].Replace(",", "")) } });
                        }
                    }
                }
            }

            File.Delete("crime-db");
            foreach (var col in dd)
            {
                var countyKey = col.Key;
                var years = col.Value.Select(x => x.Year).Distinct().OrderByDescending(x => x).ToList();
                var hold = "";
                foreach (var year in years)
                {
                    hold += ";" + year + ";";
                    var crimeRate = Math.Round(col.Value.First(x => x.Year == year && x.CrimeType == "Straftaten insgesamt").CountAverage / 100000f, 5);
                    hold += crimeRate.ToString().Replace(",", ".") + ";";
                    var topFiveDistributions = col.Value.Where(x => x.Year == year && !x.CrimeType.ToLower()
                                                                                                            .Contains("insgesamt"))
                                                                                                            .OrderByDescending(x => x.Count)
                                                                                                            .Take(4);

                    hold += string.Join(";", topFiveDistributions.Select(x => x.CrimeType + ";" + x.Count));
                }

                File.AppendAllText("crime-db", countyKey + hold + "BREAK");
            }
        }
    }
}