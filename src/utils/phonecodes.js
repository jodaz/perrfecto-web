const phoneCodes = [
	{
		"short_name": "AD",
		"short_name2": "AND",
		"name": "Andorra",
		"code": "376"
	},
	{
		"short_name": "AE",
		"short_name2": "ARE",
		"name": "Emiratos Árabes Unidos",
		"code": "971"
	},
	{
		"short_name": "AF",
		"short_name2": "AFG",
		"name": "Afganistán",
		"code": "93"
	},
	{
		"short_name": "AG",
		"short_name2": "ATG",
		"name": "Antigua y Barbuda",
		"code": "1268"
	},
	{
		"short_name": "AI",
		"short_name2": "AIA",
		"name": "Anguilla",
		"code": "1264"
	},
	{
		"short_name": "AL",
		"short_name2": "ALB",
		"name": "Albania",
		"code": "355"
	},
	{
		"short_name": "AM",
		"short_name2": "ARM",
		"name": "Armenia",
		"code": "374"
	},
	{
		"short_name": "AO",
		"short_name2": "AGO",
		"name": "Angola",
		"code": "244"
	},
	{
		"short_name": "AQ",
		"short_name2": "ATA",
		"name": "Antarctica",
		"code": "672"
	},
	{
		"short_name": "AR",
		"short_name2": "ARG",
		"name": "Argentina",
		"code": "54"
	},
	{
		"short_name": "AS",
		"short_name2": "ASM",
		"name": "Samoa Americana",
		"code": "1684"
	},
	{
		"short_name": "AT",
		"short_name2": "AUT",
		"name": "Austria",
		"code": "43"
	},
	{
		"short_name": "AU",
		"short_name2": "AUS",
		"name": "Australia",
		"code": "61"
	},
	{
		"short_name": "AW",
		"short_name2": "ABW",
		"name": "Aruba",
		"code": "297"
	},
	{
		"short_name": "AX",
		"short_name2": "ALA",
		"name": "Islas Aland",
		"code": "35818"
	},
	{
		"short_name": "AZ",
		"short_name2": "AZE",
		"name": "Azerbaijan",
		"code": "994"
	},
	{
		"short_name": "BA",
		"short_name2": "BIH",
		"name": "Bosnia y Herzegovina",
		"code": "387"
	},
	{
		"short_name": "BB",
		"short_name2": "BRB",
		"name": "Barbados",
		"code": "1246"
	},
	{
		"short_name": "BD",
		"short_name2": "BGD",
		"name": "Bangladesh",
		"code": "880"
	},
	{
		"short_name": "BE",
		"short_name2": "BEL",
		"name": "Bélgica",
		"code": "32"
	},
	{
		"short_name": "BF",
		"short_name2": "BFA",
		"name": "Burkina Faso",
		"code": "226"
	},
	{
		"short_name": "BG",
		"short_name2": "BGR",
		"name": "Bulgaria",
		"code": "359"
	},
	{
		"short_name": "BH",
		"short_name2": "BHR",
		"name": "Baréin",
		"code": "973"
	},
	{
		"short_name": "BI",
		"short_name2": "BDI",
		"name": "Burundi",
		"code": "257"
	},
	{
		"short_name": "BJ",
		"short_name2": "BEN",
		"name": "Benin",
		"code": "229"
	},
	{
		"short_name": "BM",
		"short_name2": "BMU",
		"name": "Bermuda",
		"code": "1441"
	},
	{
		"short_name": "BN",
		"short_name2": "BRN",
		"name": "Brunei",
		"code": "673"
	},
	{
		"short_name": "BO",
		"short_name2": "BOL",
		"name": "Bolivia",
		"code": "591"
	},
	{
		"short_name": "BQ",
		"short_name2": "BES",
		"name": "Caribbean Netherlands",
		"code": "5997"
	},
	{
		"short_name": "BR",
		"short_name2": "BRA",
		"name": "Brasil",
		"code": "55"
	},
	{
		"short_name": "BS",
		"short_name2": "BHS",
		"name": "Bahamas",
		"code": "1242"
	},
	{
		"short_name": "BT",
		"short_name2": "BTN",
		"name": "Bhutan",
		"code": "975"
	},
	{
		"short_name": "BW",
		"short_name2": "BWA",
		"name": "Botswana",
		"code": "267"
	},
	{
		"short_name": "BY",
		"short_name2": "BLR",
		"name": "Bielorrusia",
		"code": "375"
	},
	{
		"short_name": "BZ",
		"short_name2": "BLZ",
		"name": "Belice",
		"code": "501"
	},
	{
		"short_name": "CA",
		"short_name2": "CAN",
		"name": "Canadá",
		"code": "1"
	},
	{
		"short_name": "CC",
		"short_name2": "CCK",
		"name": "Islas Cocos",
		"code": "61"
	},
	{
		"short_name": "CD",
		"short_name2": "COD",
		"name": "Congo",
		"code": "243"
	},
	{
		"short_name": "CF",
		"short_name2": "CAF",
		"name": "República Centroafricana",
		"code": "236"
	},
	{
		"short_name": "CG",
		"short_name2": "COG",
		"name": "Congo",
		"code": "242"
	},
	{
		"short_name": "CH",
		"short_name2": "CHE",
		"name": "Suiza",
		"code": "41"
	},
	{
		"short_name": "CI",
		"short_name2": "CIV",
		"name": "Costa de Marfil",
		"code": "225"
	},
	{
		"short_name": "CK",
		"short_name2": "COK",
		"name": "Islas Cook",
		"code": "682"
	},
	{
		"short_name": "CL",
		"short_name2": "CHL",
		"name": "Chile",
		"code": "56"
	},
	{
		"short_name": "CM",
		"short_name2": "CMR",
		"name": "Camerún",
		"code": "237"
	},
	{
		"short_name": "CN",
		"short_name2": "CHN",
		"name": "China",
		"code": "86"
	},
	{
		"short_name": "CO",
		"short_name2": "COL",
		"name": "Colombia",
		"code": "57"
	},
	{
		"short_name": "CR",
		"short_name2": "CRI",
		"name": "Costa Rica",
		"code": "506"
	},
	{
		"short_name": "CU",
		"short_name2": "CUB",
		"name": "Cuba",
		"code": "53"
	},
	{
		"short_name": "CV",
		"short_name2": "CPV",
		"name": "Cabo Verde",
		"code": "238"
	},
	{
		"short_name": "CW",
		"short_name2": "CUW",
		"name": "Curazao",
		"code": "5999"
	},
	{
		"short_name": "CX",
		"short_name2": "CXR",
		"name": "Christmas Island",
		"code": "61"
	},
	{
		"short_name": "CY",
		"short_name2": "CYP",
		"name": "Chipre",
		"code": "357"
	},
	{
		"short_name": "CZ",
		"short_name2": "CZE",
		"name": "República Checa",
		"code": "420"
	},
	{
		"short_name": "DE",
		"short_name2": "DEU",
		"name": "Alemania",
		"code": "49"
	},
	{
		"short_name": "DJ",
		"short_name2": "DJI",
		"name": "Djibouti",
		"code": "253"
	},
	{
		"short_name": "DK",
		"short_name2": "DNK",
		"name": "Dinamarca",
		"code": "45"
	},
	{
		"short_name": "DM",
		"short_name2": "DMA",
		"name": "Dominica",
		"code": "1767"
	},
	{
		"short_name": "DO",
		"short_name2": "DOM",
		"name": "República Dominicana",
		"code": "1809"
	},
	{
		"short_name": "DO1",
		"short_name2": "DOM1",
		"name": "República Dominicana",
		"code": "1829"
	},
	{
		"short_name": "DO2",
		"short_name2": "DOM2",
		"name": "República Dominicana",
		"code": "1849"
	},
	{
		"short_name": "DZ",
		"short_name2": "DZA",
		"name": "Argelia",
		"code": "213"
	},
	{
		"short_name": "EC",
		"short_name2": "ECU",
		"name": "Ecuador",
		"code": "593"
	},
	{
		"short_name": "EE",
		"short_name2": "EST",
		"name": "Estonia",
		"code": "372"
	},
	{
		"short_name": "EG",
		"short_name2": "EGY",
		"name": "Egipto",
		"code": "20"
	},
	{
		"short_name": "ER",
		"short_name2": "ERI",
		"name": "Eritrea",
		"code": "291"
	},
	{
		"short_name": "ES",
		"short_name2": "ESP",
		"name": "España",
		"code": "34"
	},
	{
		"short_name": "ET",
		"short_name2": "ETH",
		"name": "Etiopía",
		"code": "251"
	},
	{
		"short_name": "FI",
		"short_name2": "FIN",
		"name": "Finlandia",
		"code": "358"
	},
	{
		"short_name": "FJ",
		"short_name2": "FJI",
		"name": "Fiji",
		"code": "679"
	},
	{
		"short_name": "FK",
		"short_name2": "FLK",
		"name": "Islas Malvinas",
		"code": "500"
	},
	{
		"short_name": "FM",
		"short_name2": "FSM",
		"name": "Micronesia",
		"code": "691"
	},
	{
		"short_name": "FO",
		"short_name2": "FRO",
		"name": "Islas Faroe",
		"code": "298"
	},
	{
		"short_name": "FR",
		"short_name2": "FRA",
		"name": "Francia",
		"code": "33"
	},
	{
		"short_name": "GA",
		"short_name2": "GAB",
		"name": "Gabon",
		"code": "241"
	},
	{
		"short_name": "GB",
		"short_name2": "GBR",
		"name": "Reino Unido",
		"code": "44"
	},
	{
		"short_name": "GD",
		"short_name2": "GRD",
		"name": "Granada",
		"code": "1473"
	},
	{
		"short_name": "GE",
		"short_name2": "GEO",
		"name": "Georgia",
		"code": "995"
	},
	{
		"short_name": "GF",
		"short_name2": "GUF",
		"name": "Guayana Francesa",
		"code": "594"
	},
	{
		"short_name": "GG",
		"short_name2": "GGY",
		"name": "Guernsey",
		"code": "44"
	},
	{
		"short_name": "GH",
		"short_name2": "GHA",
		"name": "Ghana",
		"code": "233"
	},
	{
		"short_name": "GI",
		"short_name2": "GIB",
		"name": "Gibraltar",
		"code": "350"
	},
	{
		"short_name": "GL",
		"short_name2": "GRL",
		"name": "Greenland",
		"code": "299"
	},
	{
		"short_name": "GM",
		"short_name2": "GMB",
		"name": "Gambia",
		"code": "220"
	},
	{
		"short_name": "GN",
		"short_name2": "GIN",
		"name": "Guinea",
		"code": "224"
	},
	{
		"short_name": "GP",
		"short_name2": "GLP",
		"name": "Guadeloupe",
		"code": "590"
	},
	{
		"short_name": "GQ",
		"short_name2": "GNQ",
		"name": "Guinea Ecuatorial",
		"code": "240"
	},
	{
		"short_name": "GR",
		"short_name2": "GRC",
		"name": "Grecia",
		"code": "30"
	},
	{
		"short_name": "GS",
		"short_name2": "SGS",
		"name": "South Georgia and the South Sandwich Islands",
		"code": "500"
	},
	{
		"short_name": "GT",
		"short_name2": "GTM",
		"name": "Guatemala",
		"code": "502"
	},
	{
		"short_name": "GU",
		"short_name2": "GUM",
		"name": "Guam",
		"code": "1671"
	},
	{
		"short_name": "GW",
		"short_name2": "GNB",
		"name": "Guinea-Bissau",
		"code": "245"
	},
	{
		"short_name": "GY",
		"short_name2": "GUY",
		"name": "Guyana",
		"code": "592"
	},
	{
		"short_name": "HK",
		"short_name2": "HKG",
		"name": "Hong Kong",
		"code": "852"
	},
	{
		"short_name": "HN",
		"short_name2": "HND",
		"name": "Honduras",
		"code": "504"
	},
	{
		"short_name": "HR",
		"short_name2": "HRV",
		"name": "Croacia",
		"code": "385"
	},
	{
		"short_name": "HT",
		"short_name2": "HTI",
		"name": "Haiti",
		"code": "509"
	},
	{
		"short_name": "HU",
		"short_name2": "HUN",
		"name": "Hungría",
		"code": "36"
	},
	{
		"short_name": "ID",
		"short_name2": "IDN",
		"name": "Indonesia",
		"code": "62"
	},
	{
		"short_name": "IE",
		"short_name2": "IRL",
		"name": "Irlanda",
		"code": "353"
	},
	{
		"short_name": "IL",
		"short_name2": "ISR",
		"name": "Israel",
		"code": "972"
	},
	{
		"short_name": "IN",
		"short_name2": "IND",
		"name": "India",
		"code": "91"
	},
	{
		"short_name": "IO",
		"short_name2": "IOT",
		"name": "British Indian Ocean Territory",
		"code": "246"
	},
	{
		"short_name": "IQ",
		"short_name2": "IRQ",
		"name": "Iraq",
		"code": "964"
	},
	{
		"short_name": "IR",
		"short_name2": "IRN",
		"name": "Iran",
		"code": "98"
	},
	{
		"short_name": "IS",
		"short_name2": "ISL",
		"name": "Islandia",
		"code": "354"
	},
	{
		"short_name": "IT",
		"short_name2": "ITA",
		"name": "Italia",
		"code": "39"
	},
	{
		"short_name": "JE",
		"short_name2": "JEY",
		"name": "Jersey",
		"code": "44"
	},
	{
		"short_name": "JM",
		"short_name2": "JAM",
		"name": "Jamaica",
		"code": "1876"
	},
	{
		"short_name": "JO",
		"short_name2": "JOR",
		"name": "Jordan",
		"code": "962"
	},
	{
		"short_name": "JP",
		"short_name2": "JPN",
		"name": "Japón",
		"code": "81"
	},
	{
		"short_name": "KE",
		"short_name2": "KEN",
		"name": "Kenia",
		"code": "254"
	},
	{
		"short_name": "KG",
		"short_name2": "KGZ",
		"name": "Kyrgyzstan",
		"code": "996"
	},
	{
		"short_name": "KH",
		"short_name2": "KHM",
		"name": "Camboya",
		"code": "855"
	},
	{
		"short_name": "KI",
		"short_name2": "KIR",
		"name": "Kiribati",
		"code": "686"
	},
	{
		"short_name": "KM",
		"short_name2": "COM",
		"name": "Comoros",
		"code": "269"
	},
	{
		"short_name": "KN",
		"short_name2": "KNA",
		"name": "Saint Kitts and Nevis",
		"code": "1869"
	},
	{
		"short_name": "KP",
		"short_name2": "PRK",
		"name": "Corea del Norte",
		"code": "850"
	},
	{
		"short_name": "KR",
		"short_name2": "KOR",
		"name": "Corea del Sur",
		"code": "82"
	},
	{
		"short_name": "KW",
		"short_name2": "KWT",
		"name": "Kuwait",
		"code": "965"
	},
	{
		"short_name": "KY",
		"short_name2": "CYM",
		"name": "Islas Caimán",
		"code": "1345"
	},
	{
		"short_name": "KZ",
		"short_name2": "KAZ",
		"name": "Kazakhstan",
		"code": "7"
	},
	{
		"short_name": "LA",
		"short_name2": "LAO",
		"name": "Laos",
		"code": "856"
	},
	{
		"short_name": "LB",
		"short_name2": "LBN",
		"name": "Líbano",
		"code": "961"
	},
	{
		"short_name": "LC",
		"short_name2": "LCA",
		"name": "Santa Lucia",
		"code": "1758"
	},
	{
		"short_name": "LI",
		"short_name2": "LIE",
		"name": "Liechtenstein",
		"code": "423"
	},
	{
		"short_name": "LK",
		"short_name2": "LKA",
		"name": "Sri Lanka",
		"code": "94"
	},
	{
		"short_name": "LR",
		"short_name2": "LBR",
		"name": "Liberia",
		"code": "231"
	},
	{
		"short_name": "LS",
		"short_name2": "LSO",
		"name": "Lesoto",
		"code": "266"
	},
	{
		"short_name": "LT",
		"short_name2": "LTU",
		"name": "Lituania",
		"code": "370"
	},
	{
		"short_name": "LU",
		"short_name2": "LUX",
		"name": "Luxemburgo",
		"code": "352"
	},
	{
		"short_name": "LV",
		"short_name2": "LVA",
		"name": "Letonia",
		"code": "371"
	},
	{
		"short_name": "LY",
		"short_name2": "LBY",
		"name": "Libia",
		"code": "218"
	},
	{
		"short_name": "MA",
		"short_name2": "MAR",
		"name": "Marruecos",
		"code": "212"
	},
	{
		"short_name": "MC",
		"short_name2": "MCO",
		"name": "Monaco",
		"code": "377"
	},
	{
		"short_name": "MD",
		"short_name2": "MDA",
		"name": "Moldavia",
		"code": "373"
	},
	{
		"short_name": "ME",
		"short_name2": "MNE",
		"name": "Montenegro",
		"code": "382"
	},
	{
		"short_name": "MF",
		"short_name2": "MAF",
		"name": "Saint Martin",
		"code": "590"
	},
	{
		"short_name": "MG",
		"short_name2": "MDG",
		"name": "Madagascar",
		"code": "261"
	},
	{
		"short_name": "MH",
		"short_name2": "MHL",
		"name": "Marshall Islands",
		"code": "692"
	},
	{
		"short_name": "MK",
		"short_name2": "MKD",
		"name": "Macedonia",
		"code": "389"
	},
	{
		"short_name": "ML",
		"short_name2": "MLI",
		"name": "Mali",
		"code": "223"
	},
	{
		"short_name": "MM",
		"short_name2": "MMR",
		"name": "Myanmar",
		"code": "95"
	},
	{
		"short_name": "MN",
		"short_name2": "MNG",
		"name": "Mongolia",
		"code": "976"
	},
	{
		"short_name": "MO",
		"short_name2": "MAC",
		"name": "Macau",
		"code": "853"
	},
	{
		"short_name": "MP",
		"short_name2": "MNP",
		"name": "Northern Mariana Islands",
		"code": "1670"
	},
	{
		"short_name": "MQ",
		"short_name2": "MTQ",
		"name": "Martinique",
		"code": "596"
	},
	{
		"short_name": "MR",
		"short_name2": "MRT",
		"name": "Mauritania",
		"code": "222"
	},
	{
		"short_name": "MS",
		"short_name2": "MSR",
		"name": "Montserrat",
		"code": "1664"
	},
	{
		"short_name": "MT",
		"short_name2": "MLT",
		"name": "Malta",
		"code": "356"
	},
	{
		"short_name": "MU",
		"short_name2": "MUS",
		"name": "Mauritius",
		"code": "230"
	},
	{
		"short_name": "MV",
		"short_name2": "MDV",
		"name": "Maldivas",
		"code": "960"
	},
	{
		"short_name": "MW",
		"short_name2": "MWI",
		"name": "Malawi",
		"code": "265"
	},
	{
		"short_name": "MX",
		"short_name2": "MEX",
		"name": "México",
		"code": "52"
	},
	{
		"short_name": "MY",
		"short_name2": "MYS",
		"name": "Malasia",
		"code": "60"
	},
	{
		"short_name": "MZ",
		"short_name2": "MOZ",
		"name": "Mozambique",
		"code": "258"
	},
	{
		"short_name": "NA",
		"short_name2": "NAM",
		"name": "Namibia",
		"code": "264"
	},
	{
		"short_name": "NC",
		"short_name2": "NCL",
		"name": "Nueva Caledonia",
		"code": "687"
	},
	{
		"short_name": "NE",
		"short_name2": "NER",
		"name": "Nigeria",
		"code": "227"
	},
	{
		"short_name": "NF",
		"short_name2": "NFK",
		"name": "Norfolk Island",
		"code": "672"
	},
	{
		"short_name": "NG",
		"short_name2": "NGA",
		"name": "Nigeria",
		"code": "234"
	},
	{
		"short_name": "NI",
		"short_name2": "NIC",
		"name": "Nicaragua",
		"code": "505"
	},
	{
		"short_name": "NL",
		"short_name2": "NLD",
		"name": "Países Bajos",
		"code": "31"
	},
	{
		"short_name": "NO",
		"short_name2": "NOR",
		"name": "Noruega",
		"code": "47"
	},
	{
		"short_name": "NP",
		"short_name2": "NPL",
		"name": "Nepal",
		"code": "977"
	},
	{
		"short_name": "NR",
		"short_name2": "NRU",
		"name": "Nauru",
		"code": "674"
	},
	{
		"short_name": "NU",
		"short_name2": "NIU",
		"name": "Niue",
		"code": "683"
	},
	{
		"short_name": "NZ",
		"short_name2": "NZL",
		"name": "Nueva Zelanda",
		"code": "64"
	},
	{
		"short_name": "OM",
		"short_name2": "OMN",
		"name": "Oman",
		"code": "968"
	},
	{
		"short_name": "PA",
		"short_name2": "PAN",
		"name": "Panamá",
		"code": "507"
	},
	{
		"short_name": "PE",
		"short_name2": "PER",
		"name": "Perú",
		"code": "51"
	},
	{
		"short_name": "PF",
		"short_name2": "PYF",
		"name": "French Polynesia",
		"code": "689"
	},
	{
		"short_name": "PG",
		"short_name2": "PNG",
		"name": "Papua New Guinea",
		"code": "675"
	},
	{
		"short_name": "PH",
		"short_name2": "PHL",
		"name": "Filipinas",
		"code": "63"
	},
	{
		"short_name": "PK",
		"short_name2": "PAK",
		"name": "Pakistan",
		"code": "92"
	},
	{
		"short_name": "PL",
		"short_name2": "POL",
		"name": "Polonia",
		"code": "48"
	},
	{
		"short_name": "PM",
		"short_name2": "SPM",
		"name": "Saint Pierre and Miquelon",
		"code": "508"
	},
	{
		"short_name": "PN",
		"short_name2": "PCN",
		"name": "Pitcairn Islands",
		"code": "64"
	},
	{
		"short_name": "PR",
		"short_name2": "PRI",
		"name": "Puerto Rico",
		"code": "1787"
	},
	{
		"short_name": "PS",
		"short_name2": "PSE",
		"name": "Palestina",
		"code": "970"
	},
	{
		"short_name": "PT",
		"short_name2": "PRT",
		"name": "Portugal",
		"code": "351"
	},
	{
		"short_name": "PW",
		"short_name2": "PLW",
		"name": "Palaos",
		"code": "680"
	},
	{
		"short_name": "PY",
		"short_name2": "PRY",
		"name": "Paraguay",
		"code": "595"
	},
	{
		"short_name": "QA",
		"short_name2": "QAT",
		"name": "Catar",
		"code": "974"
	},
	{
		"short_name": "RE",
		"short_name2": "REU",
		"name": "La Réunion",
		"code": "262"
	},
	{
		"short_name": "RO",
		"short_name2": "ROU",
		"name": "Rumania",
		"code": "40"
	},
	{
		"short_name": "RS",
		"short_name2": "SRB",
		"name": "Serbia",
		"code": "381"
	},
	{
		"short_name": "RU",
		"short_name2": "RUS",
		"name": "Rusia",
		"code": "7"
	},
	{
		"short_name": "RW",
		"short_name2": "RWA",
		"name": "Ruanda",
		"code": "250"
	},
	{
		"short_name": "SA",
		"short_name2": "SAU",
		"name": "Arabia Saudita",
		"code": "966"
	},
	{
		"short_name": "SB",
		"short_name2": "SLB",
		"name": "Islas Salomón",
		"code": "677"
	},
	{
		"short_name": "SC",
		"short_name2": "SYC",
		"name": "Seychelles",
		"code": "248"
	},
	{
		"short_name": "SD",
		"short_name2": "SDN",
		"name": "Sudan",
		"code": "249"
	},
	{
		"short_name": "SE",
		"short_name2": "SWE",
		"name": "Suecia",
		"code": "46"
	},
	{
		"short_name": "SG",
		"short_name2": "SGP",
		"name": "Singapur",
		"code": "65"
	},
	{
		"short_name": "SH",
		"short_name2": "SHN",
		"name": "Saint Helena",
		"code": "290"
	},
	{
		"short_name": "SI",
		"short_name2": "SVN",
		"name": "Eslovenia",
		"code": "386"
	},
	{
		"short_name": "SJ",
		"short_name2": "SJM",
		"name": "Svalbard and Jan Mayen",
		"code": "47"
	},
	{
		"short_name": "SK",
		"short_name2": "SVK",
		"name": "Eslovaquia",
		"code": "421"
	},
	{
		"short_name": "SL",
		"short_name2": "SLE",
		"name": "Sierra Leone",
		"code": "232"
	},
	{
		"short_name": "SM",
		"short_name2": "SMR",
		"name": "San Marino",
		"code": "378"
	},
	{
		"short_name": "SN",
		"short_name2": "SEN",
		"name": "Senegal",
		"code": "221"
	},
	{
		"short_name": "SO",
		"short_name2": "SOM",
		"name": "Somalia",
		"code": "252"
	},
	{
		"short_name": "SR",
		"short_name2": "SUR",
		"name": "Surinam",
		"code": "597"
	},
	{
		"short_name": "SS",
		"short_name2": "SSD",
		"name": "Sudán del Sur",
		"code": "211"
	},
	{
		"short_name": "ST",
		"short_name2": "STP",
		"name": "São Tomé and Príncipe",
		"code": "239"
	},
	{
		"short_name": "SV",
		"short_name2": "SLV",
		"name": "El Salvador",
		"code": "503"
	},
	{
		"short_name": "SX",
		"short_name2": "SXM",
		"name": "Sint Maarten",
		"code": "1721"
	},
	{
		"short_name": "SY",
		"short_name2": "SYR",
		"name": "Siria",
		"code": "963"
	},
	{
		"short_name": "SZ",
		"short_name2": "SWZ",
		"name": "Suazilandia",
		"code": "268"
	},
	{
		"short_name": "TC",
		"short_name2": "TCA",
		"name": "Turks and Caicos Islands",
		"code": "1649"
	},
	{
		"short_name": "TD",
		"short_name2": "TCD",
		"name": "Chad",
		"code": "235"
	},
	{
		"short_name": "TG",
		"short_name2": "TGO",
		"name": "Togo",
		"code": "228"
	},
	{
		"short_name": "TH",
		"short_name2": "THA",
		"name": "Tailandia",
		"code": "66"
	},
	{
		"short_name": "TJ",
		"short_name2": "TJK",
		"name": "Tajikistan",
		"code": "992"
	},
	{
		"short_name": "TK",
		"short_name2": "TKL",
		"name": "Tokelau",
		"code": "690"
	},
	{
		"short_name": "TM",
		"short_name2": "TKM",
		"name": "Turkmenistan",
		"code": "993"
	},
	{
		"short_name": "TN",
		"short_name2": "TUN",
		"name": "Túnez",
		"code": "216"
	},
	{
		"short_name": "TO",
		"short_name2": "TON",
		"name": "Tonga",
		"code": "676"
	},
	{
		"short_name": "TR",
		"short_name2": "TUR",
		"name": "Turquía",
		"code": "90"
	},
	{
		"short_name": "TT",
		"short_name2": "TTO",
		"name": "Trinidad y Tobago",
		"code": "1868"
	},
	{
		"short_name": "TV",
		"short_name2": "TUV",
		"name": "Tuvalu",
		"code": "688"
	},
	{
		"short_name": "TW",
		"short_name2": "TWN",
		"name": "Taiwan",
		"code": "886"
	},
	{
		"short_name": "TZ",
		"short_name2": "TZA",
		"name": "Tanzania",
		"code": "255"
	},
	{
		"short_name": "UA",
		"short_name2": "UKR",
		"name": "Ukrania",
		"code": "380"
	},
	{
		"short_name": "UG",
		"short_name2": "UGA",
		"name": "Uganda",
		"code": "256"
	},
	{
		"short_name": "US",
		"short_name2": "USA",
		"name": "Estados Unidos",
		"code": "1"
	},
	{
		"short_name": "UY",
		"short_name2": "URY",
		"name": "Uruguay",
		"code": "598"
	},
	{
		"short_name": "UZ",
		"short_name2": "UZB",
		"name": "Uzbekistan",
		"code": "998"
	},
	{
		"short_name": "VA",
		"short_name2": "VAT",
		"name": "Ciudad del Vaticano",
		"code": "379"
	},
	{
		"short_name": "VC",
		"short_name2": "VCT",
		"name": "Saint Vincent and the Grenadines",
		"code": "1784"
	},
	{
		"short_name": "VE",
		"short_name2": "VEN",
		"name": "Venezuela",
		"code": "58"
	},
	{
		"short_name": "VG",
		"short_name2": "VGB",
		"name": "British Virgin Islands",
		"code": "1284"
	},
	{
		"short_name": "VI",
		"short_name2": "VIR",
		"name": "U.S. Virgin Islands",
		"code": "1340"
	},
	{
		"short_name": "VN",
		"short_name2": "VNM",
		"name": "Vietnam",
		"code": "84"
	},
	{
		"short_name": "VU",
		"short_name2": "VUT",
		"name": "Vanuatu",
		"code": "678"
	},
	{
		"short_name": "WF",
		"short_name2": "WLF",
		"name": "Wallis and Futuna",
		"code": "681"
	},
	{
		"short_name": "WS",
		"short_name2": "WSM",
		"name": "Samoa",
		"code": "685"
	},
	{
		"short_name": "XK",
		"short_name2": "XKX",
		"name": "Kosovo",
		"code": "383"
	},
	{
		"short_name": "YE",
		"short_name2": "YEM",
		"name": "Yemen",
		"code": "967"
	},
	{
		"short_name": "YT",
		"short_name2": "MYT",
		"name": "Mayotte",
		"code": "262"
	},
	{
		"short_name": "ZA",
		"short_name2": "ZAF",
		"name": "África austral",
		"code": "27"
	},
	{
		"short_name": "ZM",
		"short_name2": "ZMB",
		"name": "Zambia",
		"code": "260"
	},
	{
		"short_name": "ZW",
		"short_name2": "ZWE",
		"name": "Zimbabue",
		"code": "263"
	}
]

export default phoneCodes
