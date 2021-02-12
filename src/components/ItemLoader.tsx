import React from 'react';
import ContentLoader, {Rect, Circle} from 'react-content-loader/native';

function ItemLoader() {
  return (
    <ContentLoader
      speed={0.7}
      width={400}
      height={200}
      viewBox="0 0 400 200"
      backgroundColor="#23213"
      foregroundColor="#ecebeb">
      <Circle cx="30" cy="20" r="20" />
      <Rect x="70" y="10" rx="5" ry="5" width="220" height="15" />
      <Rect x="300" y="10" rx="5" ry="5" width="20" height="15" />
      <Circle cx="30" cy="80" r="20" />
      <Rect x="70" y="70" rx="5" ry="5" width="220" height="15" />
      <Rect x="300" y="70" rx="5" ry="5" width="20" height="15" />
    </ContentLoader>
  );
}

export default ItemLoader;
