/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

import * as Linking from 'expo-linking';

export default {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Root: {
        screens: {
          Explore: {
            screens: {
              ExploreScreen: 'explore',
            },
          },
          Inbox: {
            screens: {
              InboxScreen: 'inbox',
            },
          },
          Blog: {
            screens: {
              BlogScreen: 'blog',
            }
          },
          Listings: {
            screens: {
              ListingsScreen: 'listings',
            }
          },
          Settings: {
            screens: {
              SettingsScreen: 'settings',
            }
          }
        },
      },
      NotFound: '*',
      Login: {
        screens: {
          LoginScreen: 'login'
        }
      },
      Register: {
        screens: {
          RegisterScreen: 'register'
        }
      }
    },
  },
};
