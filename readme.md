# Test MASGlobal Mobile Developer

Hi my name is **Edward Monsalve** and this is the introduction about how my mobile application is structured, how it was developer and the most important things that I used to achieve the test. I hope you like my app.

# Shared Components:

I’ve used only 1 functional component which is a separator, used to separate each user on the flatlist.


# Screens:

My application has 3 screens, the first one is a welcome screen which is responsible to let the user know the main functionality of the application, the second one is the home screen where the list of people is rendered and the user can do different actions like see the details of each one and paginate between 10 pages approximately.


# Code Explanation:

  
**HomeScreenComponent:**

The HomeScreen component is responsible to hit the API and call for the users, once the component is mounted a method is called to perform this action. While the data is loaded, a loading indicator appears on the screen, once the data is fetched from the API, the FlatList is rendered with the respective avatars and the possibility to do click and go to de details. Also this page contains a paginator, which is an external packaged I’ve used, that package is called “react-native-dots-pagination” and basically only show an amount of circles and receive a property which is the number of the current page rendered, then that number of circle is shown in other color. When the next or previous buttons are pressed, the application performs another call to the API.

  

**ProfileScreenComponent:**

This screes is responsible to show the details of the user that was previously selected, in addition the user has the possibility to take a photo with the cellphone and it will be shown in the details of the user, you can take the amount of photos you want, but those photos will be deleted once you get back to another screen.

# Navigation:

For the navigation, I’ve used the good know packages react-navigation and react-navigation-stack, these packages help me to simply set up the routing of my application.

# Scaffolding (Folder Structure)

I’ve defined a basic but at the same time a good scaffolding to be able to scale and grow the application.
