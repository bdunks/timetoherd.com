import React from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";
import { toast } from "react-toastify";
import { CountriesMasterList } from "../../shared/data-factory.js";

const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

export const MapChart = ({
  setTooltipContent,
  setSelectedCountry,
  selectedCountry,
}) => {
  const handleCountryClick = (NAME, ISO_A3) => {
    if (
      CountriesMasterList.find((country) => {
        return country.iso_code === ISO_A3;
      })
    ) {
      setSelectedCountry({
        name: NAME,
        iso_code: ISO_A3,
      });
    } else {
      toast(
        "hmmm...Looks like we don't have enough data for " + NAME + " yet!"
      );
    }
  };
  return (
    <>
      <ComposableMap data-tip="" projectionConfig={{ scale: 200 }}>
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                onClick={() => {
                  const { NAME, ISO_A3 } = geo.properties;
                  handleCountryClick(NAME, ISO_A3);
                }}
                onMouseEnter={() => {
                  const { NAME } = geo.properties;
                  setTooltipContent(`${NAME}`);
                }}
                onMouseLeave={() => {
                  setTooltipContent("");
                }}
                style={
                  selectedCountry.iso_code === geo.properties.ISO_A3
                    ? {
                        default: {
                          fill: "#2E9BFF",
                          outline: "none",
                        },
                        hover: {
                          fill: "#2E9BFF",
                          outline: "none",
                        },
                        pressed: {
                          fill: "#2E9BFF",
                          outline: "none",
                        },
                      }
                    : {
                        default: {
                          fill: "#D6D6DA",
                          outline: "none",
                        },
                        hover: {
                          fill: "#D4EBFF",
                          outline: "none",
                        },
                        pressed: {
                          fill: "#2E9BFF",
                          outline: "none",
                        },
                      }
                }
              />
            ))
          }
        </Geographies>
        {CountriesMasterList.map(({ location, coordinates }) => (
          <Marker key={location} coordinates={coordinates}>
            <g
              fill="none"
              stroke="#00C63F"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              transform="translate(-12, -24)"
            >
              <circle cx="12" cy="10" r="3" />
              <path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 6.9 8 11.7z" />
            </g>
          </Marker>
        ))}
      </ComposableMap>
    </>
  );
};
