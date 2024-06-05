// import { View, StyleSheet, TextInput, Button, SafeAreaView, Text, FlatList } from 'react-native';
// import React, { useState, useEffect } from 'react';
// import firestore, { firebase } from '@react-native-firebase/firestore';
// export interface Todo {
// 	done: boolean;
// 	id: string;
// 	title: string;
// }

// const List = () => {
// 	const [todo, setTodo] = useState('');
// 	const [TodosList, setTodosList] = useState([]);

// 	const addTodo = async () => {
// 		// TODO
// 		// alert(todo);
// 		firebase.firestore().collection("Todos").add({
// 			sample_data: todo
// 		});
// 		// setTodo
// 		setTodo("");
// 	};
// 	const [data, setData] = useState<{ id: string }[]>([]); // Explicitly annotate the type

// 	useEffect(() => {
// 	  const unsubscribe = firebase.firestore().collection('Todos')
// 		.onSnapshot((snapshot) => {
// 		  const newData = snapshot.docs.map((doc) => ({
// 			id: doc.id,
// 			...doc.data()
// 			// ['sample_data'],
// 		  }));
// 		  setData(newData);
// 		});
  
// 	  return () => {
// 		unsubscribe();
// 	  };
// 	}, []);
// 	return (
// 		<View style={styles.container}>
// 			<View style={styles.form}>
// 				<TextInput
// 					style={styles.input}
// 					placeholder="Add new todo"
// 					onChangeText={(text: string) => setTodo(text)}
// 					value={todo}
// 				/>
// 				<Button onPress={addTodo} title="Add Todo" disabled={todo === ''} color={'black'} />
// 			</View>
// 			<FlatList
//         data={data}
//         renderItem={({ item }) => (
//           <Text>{item['sample_data']}</Text> // Assuming you have a 'name' field
//         )}
//         keyExtractor={(item) => item.id}
//       />
// 		</View>
// 	);
// };

// const styles = StyleSheet.create({
// 	container: {
// 		marginHorizontal: 20
// 	},
// 	form: {
// 		marginVertical: 20,
// 		flexDirection: 'row',
// 		alignItems: 'center'
// 	},
// 	input: {
// 		flex: 1,
// 		height: 40,
// 		borderWidth: 1,
// 		borderRadius: 4,
// 		padding: 10,
// 		backgroundColor: '#fff',
// 		marginRight:10
// 	}
// });

// export default List;


import { View, StyleSheet, TextInput, Button, SafeAreaView, Text, SectionList } from 'react-native';
import React, { useState, useEffect } from 'react';
import firestore, { firebase } from '@react-native-firebase/firestore';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

export interface Todo {
  done: boolean;
  id: string;
  title: string;
}

const List = () => {
  const [todo, setTodo] = useState('');
  const [TodosList, setTodosList] = useState([]);

  const addTodo = async () => {
    firebase.firestore().collection('Todos').add({
      sample_data: todo,
    });
    setTodo('');
  };

  const [data, setData] = useState<{ id: string }[]>([]); // Explicitly annotate the type

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection('Todos')
      .onSnapshot((snapshot) => {
        const newData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        const groupedData = newData.reduce((acc, item) => {
          const sectionTitle = item.done ? 'Completed' : 'Incomplete';
          const existingSection = acc.find((section) => section.title === sectionTitle);
          
          if (existingSection) {
            existingSection.data.push(item);
          } else {
            acc.push({
              title: sectionTitle,
              data: [item],
            });
          }
          
          return acc;
        }, []); 

        setData(groupedData);
      });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Add new todo"
          onChangeText={(text: string) => setTodo(text)}
          value={todo}
        />
        <Button onPress={addTodo} title="Add Todo" disabled={todo === ''} color={'black'} />
      </View>
      <SectionList
	  style={{marginBottom: 80}}
        sections={data}
        // renderItem={({ item }) =>(<View> <Text>{item.sample_data}</Text></View>) }
		renderItem={({item}) => (
			<View style={styles.sectionItems}>
			  <Text style={styles.sectionItemText}>{item.sample_data}</Text>
			  {/* <FontAwesomeIcon icon={ faMugSaucer } color={ 'red' } /> */}
			  <FontAwesomeIcon icon="square-check" />

			</View>
		  )}
        // renderSectionHeader={({ section: { title } }) => <Text style={styles.sectionHeader}>{title}</Text>}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
  },
  form: {
    marginVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    backgroundColor: '#fff',
    marginRight: 10,
  },
  sectionItems: {
	backgroundColor: '#616691',
	marginTop: 3,
	// border: '10px solid blue',
	// borderRadius: 
	// borderRadius: 30,
	borderRadius: 10,
	borderWidth: 2.5,
	borderColor: '#fff',
	height: 50,
	display: 'flex',
	justifyContent: 'center'
	// width: 10
  },
  sectionItemText: {
	// marginTop: 3,
	// display: 'flex'
	color: 'white',
	marginLeft: 10,
	// fontSize: 20
	fontSize: 16
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingVertical: 8,
    backgroundColor: '#f4f4f4',
  },
});

export default List;

//mahiya jina sohna song