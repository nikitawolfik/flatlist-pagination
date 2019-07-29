import React from 'react';
import { FlatList, View, Animated, Platform } from 'react-native';
import PropTypes from 'prop-types';

import styles from './styles';


const IOS = Platform.OS === 'ios';

const VIEWABILITY_CONFIG = {
  viewAreaCoveragePercentThreshold: 50,
};
const ORANGE = 'rgb(237,172,113)';
const GRAY = 'rgba(0,0,0,0.3)';


const Paginator = ({
  data,
  renderItem,
  keyExtractor,
  contentContainerStyle,
  itemWidth,
}) => {
  const scrollValue = React.useRef(new Animated.Value(0));

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

  const onScrollEndDrag = (e) => {
    const speed = e.nativeEvent.velocity.x;
    if (IOS) {
      if (speed > 1 && visibleElement < data.length - 1) {
        visibleElement += 1;
      }
      if (speed < -1 && visibleElement > 0) {
        visibleElement -= 1;
      }
    }
    //  needs to be tested
    if (!IOS) {
      if (speed < -1 && visibleElement < data.length - 1) {
        visibleElement += 1;
      }
      if (speed > 1 && visibleElement > 0) {
        visibleElement -= 1;
      }
    }

    flatlist.current.scrollToIndex({ index: visibleElement, animated: true, viewPosition: 0.5 });
  };

  return (
    <>
      <FlatList
        onScroll={Animated.event([{
          nativeEvent: { contentOffset: { x: scrollValue.current } },
        }])}
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
      <View style={styles.animationContainer}>
        <Animated.View
          style={[{
            backgroundColor: scrollValue.current.interpolate({
              inputRange: [0, itemWidth],
              outputRange: [ORANGE, GRAY],
              extrapolate: 'clamp',
            }),
          }, styles.indicator]}
        />
        <Animated.View
          style={[{
            backgroundColor: scrollValue.current.interpolate({
              inputRange: [0, itemWidth],
              outputRange: [GRAY, ORANGE],
              extrapolate: 'clamp',
            }),
            marginLeft: 11,
          }, styles.indicator]}
        />
      </View>
    </>
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
