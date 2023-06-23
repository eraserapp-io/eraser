import React, {FunctionComponent, useMemo, useRef, useState} from 'react';
import {View} from 'react-native';
import {Assignment, HomeProps} from '@types';
import {useTheme} from '@state';
import {AddAssignmentModal, Header, IconButton} from '@components';
import {getCurrentGreeting} from 'tools';
import {Calendar} from './Calendar';
import BottomSheet from '@gorhom/bottom-sheet';

export const Home: FunctionComponent<HomeProps> = ({}: HomeProps) => {
  const {theme, spacing} = useTheme();

  const sheetRef = useRef<BottomSheet>(null);
  const [selectedAssignment, setSelectedAssignment] = useState<
    Assignment | undefined
  >(undefined);

  const currentGreeting = useMemo(() => getCurrentGreeting(), []);

  return (
    <View style={{flex: 1, backgroundColor: theme?.backgroundLight}}>
      <Header
        title={`Good ${currentGreeting},\nUser`}
        headerStyle={{
          backgroundColor: theme?.background,
          paddingBottom: spacing.reg,
          borderBottomRightRadius: spacing.reg,
          borderBottomLeftRadius: spacing.reg,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 3,
          },
          shadowOpacity: 0.29,
          shadowRadius: 4.65,

          elevation: 7,
          zIndex: 1,
        }}
        headerRight={
          <View
            style={{
              marginTop: 6,
              marginRight: spacing.reg,
              flex: 1,
              flexDirection: 'row',
            }}>
            <IconButton
              onPress={() => {
                sheetRef.current?.expand();
              }}
              inverted={true}
              iconName={'plus'}
            />
          </View>
        }
      />
      <View style={{flex: 1}}>
        <Calendar
          onItemPress={async item => {
            setSelectedAssignment(item);
            sheetRef?.current?.expand();
          }}
        />
      </View>
      <AddAssignmentModal
        setAssignment={setSelectedAssignment}
        assignment={selectedAssignment}
        sheetRef={sheetRef}
      />
    </View>
  );
};
