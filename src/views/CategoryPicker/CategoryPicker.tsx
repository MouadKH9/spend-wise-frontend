/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {Dimensions, FlatList, StyleSheet, View} from 'react-native';
import {Image, Overlay, Text, Theme, withTheme} from 'react-native-elements';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Feather';
import ItemLoader from '../../components/ItemLoader';
import {getCategories} from '../../services/records.service';
import {Category} from '../../types/types';

export type CategoryDTO = {category: Category; hasChildren?: boolean};

function CategoryPicker({
  theme,
  onClose,
  onSelect,
  isVisible,
  type,
}: {
  theme: Theme;
  onClose: () => void;
  isVisible: boolean;
  onSelect: (category: CategoryDTO) => void;
  type: -1 | 1 | 0;
}) {
  const [categories, setCategories] = useState<CategoryDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentCategory, setCurrentCategory] = useState<null | CategoryDTO>(
    null,
  );

  useEffect(() => {
    refresh();
  }, [type]);

  const refresh = async (parentId?: number) => {
    setLoading(true);
    const newCategories = await getCategories(type, parentId);
    setCategories(newCategories);
    setLoading(false);
    if (parentId) setCurrentCategory({category: {id: parentId}});
    else setCurrentCategory(null);
  };

  const onDrill = (category: CategoryDTO) => {
    setCurrentCategory(category);
    refresh(category.category.id);
  };

  const renderItem = ({item, index}: {item: CategoryDTO; index: number}) => {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.left} onPress={() => onSelect(item)}>
          <Image
            source={
              item.category.icon
                ? {
                    uri: item.category.icon,
                  }
                : require('../../assets/img/file.png')
            }
            style={styles.image}
          />
          <Text style={styles.name}>{item.category.name}</Text>
        </TouchableOpacity>
        {item.hasChildren && (
          <TouchableOpacity onPress={() => onDrill(item)}>
            <Icon name="chevron-right" size={20} />
          </TouchableOpacity>
        )}
      </View>
    );
  };

  const {width, height} = Dimensions.get('window');

  console.log(
    '🚀 ~ file: CategoryPicker.tsx ~ line 85 ~ currentCategory',
    currentCategory,
  );
  return (
    <Overlay isVisible={isVisible} onBackdropPress={onClose}>
      <View
        style={{
          width: width - 50,
          minHeight: height - 400,
          maxHeight: width - 100,
        }}>
        <View style={styles.headerContainer}>
          {currentCategory?.category && (
            <TouchableOpacity
              onPress={() => {
                refresh(currentCategory?.category.parentCategoryId);
              }}>
              <Icon name="chevron-left" size={20} style={{marginRight: 10}} />
            </TouchableOpacity>
          )}
          <Text h4>Select a category</Text>
        </View>
        <View style={styles.content}>
          {loading ? (
            <ItemLoader />
          ) : (
            <FlatList
              style={{flex: 1}}
              renderItem={renderItem}
              data={categories}
              ListEmptyComponent={
                <Text
                  style={{
                    color: theme.colors?.grey0,
                    fontSize: 16,
                    textAlign: 'center',
                  }}>
                  No categories found
                </Text>
              }
            />
          )}
        </View>
      </View>
    </Overlay>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    padding: 10,
    flex: 0.07,
    alignItems: 'center',
  },
  content: {
    paddingHorizontal: 30,
    flex: 0.9,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderColor: 'gray',
    paddingHorizontal: 10,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 35,
    height: 35,
    marginRight: 20,
  },
  name: {
    fontSize: 16,
  },
  amount: {
    fontSize: 16,
  },
});

export default withTheme(CategoryPicker);
