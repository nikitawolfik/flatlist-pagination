import React from 'react';
import { FlatList } from 'react-native';
import PropTypes from 'prop-types';


const VIEWABILITY_CONFIG = {
  viewAreaCoveragePercentThreshold: 50,
};


const Paginator = ({
  data,
  renderItem,
  keyExtractor,
  contentContainerStyle,
  itemWidth,
}) => {
  let visibleElement = 0;
  const flatlist = React.useRef();

  const getItemLayout = (data, index) => ({
    length: itemWidth,
    offset: itemWidth * index,
    index,
  });

  const onViewableItemsChanged = (info) => {
    const { index = 0 } = info.viewableItems[0];
    visibleElement = index;
  };

  const onScrollEndDrag = () => {
    flatlist.current.scrollToIndex({ index: visibleElement, animated: true, viewPosition: 0.5 });
  };

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={contentContainerStyle}
      keyExtractor={keyExtractor}
      ref={flatlist}
      getItemLayout={getItemLayout}
      viewabilityConfig={VIEWABILITY_CONFIG}
      onViewableItemsChanged={onViewableItemsChanged}
      onScrollEndDrag={onScrollEndDrag}
    />
  );
};

Paginator.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({})),
  renderItem: PropTypes.func,
  keyExtractor: PropTypes.func,
  contentContainerStyle: PropTypes.shape({}),
  itemWidth: PropTypes.number,
};

export default Paginator;
