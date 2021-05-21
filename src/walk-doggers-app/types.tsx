/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
  // Login: undefined;
  // Register: undefined;
};

export type BottomTabParamList = {
  Explore: undefined;
  Inbox: undefined;
  Blog: undefined;
  Listings: undefined;
  Settings: undefined;
};

export type ExploreParamList = {
  ExploreScreen: undefined;
  DogScreen: undefined;
};

export type InboxParamList = {
  InboxScreen: undefined;
  MessageScreen: undefined;
};

export type BlogParamList = {
  BlogScreen: undefined;
  NewBlogPostScreen: undefined;
  BlogPostScreen: undefined;
};

export type ListingsParamList = {
  ListingsScreen: undefined;
  NewListingScreen: undefined;
};

export type SettingsParamList = {
  SettingsScreen: undefined;
  EditProfileScreen: undefined;
  BecomeAReporterScreen: undefined;
  MyDogsScreen: undefined;
  NewDogScreen: undefined;
  EditDogScreen: undefined
};

export type LoginParamList = {
  Root: undefined;
  Register: undefined;
}
