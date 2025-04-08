import { StyleSheet } from 'react-native';

const style = StyleSheet.create({
  view1: {
    backgroundColor: '#0A192C',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 15,
  },

  bg: {
    backgroundColor: '#0A192C',
    shadowColor: '#00FFFF',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 6,
    zIndex: 999, // Keep header above other elements
  },

  profilio: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  usernameText: {
    color: '#E0E0E0',
    fontSize: 13,
    marginTop: 4,
    textAlign: 'center',
    fontWeight: '500',
  },

  img1: {
    height: 40,
    width: 40,
    borderRadius: 20,
    marginLeft: 0,
    borderWidth: 1,
    borderColor: '#00BFFF',
  },

  img2: {
    height: 45,
    width: 45,
    borderRadius: 22.5,
    borderWidth: 1,
    borderColor: '#FF1493',
    shadowColor: '#FF69B4',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 8,
  },

  text1: {
    color: '#F8F8F8',
    fontSize: 26,
    letterSpacing: 2,
    fontWeight: '600',
    marginLeft: 10,
  },

  text2: {
    color: 'white',
    marginRight: 10,
    fontSize: 15,
  },
});

export default style;
