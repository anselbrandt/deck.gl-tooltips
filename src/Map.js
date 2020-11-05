import React from 'react';
import MapGL from 'react-map-gl';
import { DeckGL, ScatterplotLayer } from 'deck.gl';
import { easeBackOut } from 'd3';

export default function Map({
  width,
  height,
  viewState,
  onViewStateChange,
  libraries,
  radius,
}) {
  const layers = [
    new ScatterplotLayer({
      id: 'scatterplot-layer',
      data: libraries,
      getRadius: 500 * radius,
      radiusMaxPixels: 15,
      getFillColor: [255, 99, 71],
      pickable: true,
      onClick: ({ object }) => console.log(object.position),
      autoHighlight: true,
      transitions: {
        getRadius: {
          duration: 1000,
          easing: easeBackOut,
        },
      },
    }),
  ];

  return (
    <div>
      <MapGL
        width={width}
        height={height}
        viewState={viewState}
        onViewStateChange={onViewStateChange}
      >
        <DeckGL
          viewState={viewState}
          layers={layers}
          getTooltip={({ object }) =>
            object && {
              html: `<div>${object.name}</div><div>${object.city}</div>`,
              style: {
                backgroundColor: 'grey',
                color: 'white',
                fontSize: '1rem',
                borderRadius: '.5em',
              },
            }
          }
        />
      </MapGL>
    </div>
  );
}

// https://deck.gl/docs/api-reference/core/deck
/*
Callback that takes a hovered-over point and renders a tooltip. If the prop is not specified, the tooltip is hidden.

Callback arguments:

info - the picking info describing the object being hovered.
If the callback returns null, the tooltip is hidden, with the CSS display property set to none. If the callback returns a string, that string is rendered in a tooltip with the default CSS styling described below. Otherwise, the callback can return an object with the following fields:

text (String, optional) - Specifies the innerText attribute of the tooltip.
html (String, optional) - Specifies the innerHTML attribute of the tooltip. Note that this will override the specified innerText.
className (String, optional) - Class name to attach to the tooltip element. The element has the default class name of deck-tooltip.
style (Object, optional) - An object of CSS styles to apply to the tooltip element, which can override the default styling.
By default, the tooltip has the following CSS style:

z-index: 1;
position: absolute;
color: #a0a7b4;
background-color: #29323c;
padding: 10px;
*/
