import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';

interface OptionsProps {
  hide: boolean;
  expand: boolean;
  onOpenPress: () => void;
  onClosePress: () => void;
  title: string;
  children: React.ReactNode;
}

const Option: React.FC<OptionsProps> = ({
  expand,
  onClosePress,
  title,
  onOpenPress,
  hide,
  children,
}) => {
  if (hide) {
    return null;
  }
  return (
    <View style={{ marginTop: 30, marginBottom: expand ? 100 : 0 }}>
      {!expand ? (
        <Text style={styles.title} onPress={onOpenPress}>
          Open {title}
        </Text>
      ) : (
        <View style={styles.centerContent}>
          <Text
            style={[styles.title, { marginBottom: 20 }]}
            onPress={onClosePress}
          >
            Close {title}
          </Text>
          {children}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontWeight: 'bold',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  centerContent: {
    alignItems: 'center',
  },
  slider: {
    width: Dimensions.get('screen').width * 0.8,
  },
  box: {
    width: 220,
    height: 220,
    marginVertical: 20,
  },
});

export default React.memo(Option);
