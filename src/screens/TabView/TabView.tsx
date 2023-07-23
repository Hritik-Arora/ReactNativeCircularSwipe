import React, { useCallback, useMemo, useRef, useState } from 'react';
import {
  Animated,
  GestureResponderEvent,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import styles from './styles';
import Tab from '../../components/Tab';
import TabScreenComponent from '../../components/TabScreenComponent';
import { SCREEN_DIMENSIONS } from '../../constants/common';

interface ITab {
  id: number;
  color: string;
}

interface IProps {
  animated?: boolean;
}

const TabView: React.FC<IProps> = (props) => {
  const {
    animated = false,
  } = props;

  const [tabs, setTabs] = useState<ITab[]>([]); // Color of first tab to be blue
  const [activeTab, setActiveTab] = useState<ITab | null>(null);
  const beforeScreenTranslate = useRef(new Animated.Value(-SCREEN_DIMENSIONS.width));
  const afterScreenTranslate = useRef(new Animated.Value(SCREEN_DIMENSIONS.width));
  const beforeScreenIndex = useRef(0);
  const afterScreenIndex = useRef(0);
  const initialTouchCoordinates = useRef({ x: 0, y: 0 });

  const addNewTab = useCallback(() => {
    const newTabs = [...tabs, {
      // Generate a random color and assign to this tab
      id: tabs.length > 0 ? tabs[tabs.length - 1].id + 1 : 0,
      color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
    }];
    setTabs(newTabs);
    setActiveTab(newTabs[newTabs.length - 1]);
  }, [tabs]);

  const handleTabPress = useCallback((tab: ITab) => {
    setActiveTab(tab);
  }, []);

  const handleRemoveActiveTab = useCallback(() => {
    if (!activeTab) {
      return;
    }
    let tabRemovedIndex = 0;
    const newTabs = tabs.filter((tab, index) => {
      if (tab.id === activeTab.id) {
        tabRemovedIndex = index;
        return false;
      }
      return true;
    });
    setTabs(newTabs);
    if (newTabs.length === 0) {
      // No tabs are left now. So, set activeTab to null
      setActiveTab(null);
    } else {
      // Set the active tab to the one before this
      if (tabRemovedIndex === 0) {
        // Firts tab was removed. Set the active tab to the last tab
        setActiveTab(newTabs[newTabs.length - 1]);
      } else {
        setActiveTab(newTabs[tabRemovedIndex - 1])
      }
    }
  }, [tabs, activeTab]);

  const handleTouchStart = useCallback((event: GestureResponderEvent) => {
    initialTouchCoordinates.current = {
      x: event.nativeEvent.pageX,
      y: event.nativeEvent.pageY,
    };
  }, []);

  const handleTouchEnd = useCallback((event: GestureResponderEvent) => {
    if (event.nativeEvent.pageX - initialTouchCoordinates.current.x > 50) {
      // Swiped left - show the tab before
      if (animated) {
        Animated.timing(beforeScreenTranslate.current, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }).start(() => {
          setActiveTab(tabs[beforeScreenIndex.current]);
          beforeScreenTranslate.current.setValue(-SCREEN_DIMENSIONS.width);
        });
      } else {
        setActiveTab(tabs[beforeScreenIndex.current]);
      }
    } else if (initialTouchCoordinates.current.x - event.nativeEvent.pageX > 50) {
      // Swiped right - show the tab after
      if (animated) {
        Animated.timing(afterScreenTranslate.current, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }).start(() => {
          setActiveTab(tabs[afterScreenIndex.current]);
          afterScreenTranslate.current.setValue(SCREEN_DIMENSIONS.width);
        });
      } else {
        setActiveTab(tabs[afterScreenIndex.current]);
      }
    }
    initialTouchCoordinates.current = { x: 0, y: 0 };
  }, [animated, tabs]);

  const renderTabViewScreens = useMemo(() => {
    if (!activeTab || tabs.length === 0) {
      return null;
    }
    if (tabs.length === 1) {
      return (
      <TabScreenComponent
        id={activeTab.id}
        color={activeTab.color}
        removeTab={handleRemoveActiveTab}
      />
      );
    }
    /**
     * Render only 3 screens at a time - one before, one after, and the current one
     * We could have kept rendered all the screens at the same time for easiness,
     * but that would not be performant, as React would have to keep all the screens
     * rendered then.
     */
    const activeTabIndex = tabs.findIndex((tab) => activeTab.id === tab.id);
    beforeScreenIndex.current = (activeTabIndex - 1) >= 0 ? activeTabIndex - 1 : tabs.length - 1;
    afterScreenIndex.current = activeTabIndex + 1 < tabs.length ? activeTabIndex + 1 : 0;
    return (
      <View
        style={styles.tabScreensSwipeContainer}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <TabScreenComponent
          id={tabs[beforeScreenIndex.current].id}
          color={tabs[beforeScreenIndex.current].color}
          removeTab={handleRemoveActiveTab}
          containerStyle={{
            position: 'absolute',
            transform: [
              { translateX: beforeScreenTranslate.current },
            ],
            zIndex: 20,
            width: '100%',
          }}
        />
      <TabScreenComponent
        id={activeTab.id}
        color={activeTab.color}
        removeTab={handleRemoveActiveTab}
        containerStyle={{zIndex: -1}}
      />
      <TabScreenComponent
        id={tabs[afterScreenIndex.current].id}
        color={tabs[afterScreenIndex.current].color}
        removeTab={handleRemoveActiveTab}
        containerStyle={{
          position: 'absolute',
          transform: [
            { translateX: afterScreenTranslate.current },
          ],
          zIndex: 20,
          width: '100%',
        }}
      />
      </View>
    )
  }, [activeTab, tabs, handleTouchStart, handleTouchEnd]);

  return (
    <View style={styles.container}>
      <View style={styles.ctaContainer}>
        <TouchableOpacity
          style={styles.addNewTabBtn}
          onPress={addNewTab}
        >
          <Text style={styles.ctaText}>Add New Tab</Text>
        </TouchableOpacity>
        <ScrollView horizontal style={styles.tabScrollView} contentContainerStyle={styles.tabCtaContainer}>
          {
            tabs.map((tab) => (
              <Tab
                key={tab.id / tabs.length}
                onPress={() => { handleTabPress(tab); }}
                id={tab.id}
                isActive={tab.id === activeTab?.id}
              />
            ))
          }
        </ScrollView>
      </View>
      <View style={styles.tabScreenContainer}>
        {
          activeTab ? (
            renderTabViewScreens
          ) : (
            <Text style={styles.noTabText}>No Tab is Added</Text>
          )
        }
        </View>
    </View>
  );
};

export default TabView;
