import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {Text} from '../atoms';
import {Assignment, ButtonTypes, Course, TextTypes} from '@types';
import {Alert, FlatList, Keyboard, TouchableOpacity, View} from 'react-native';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetTextInput,
} from '@gorhom/bottom-sheet';
import {useAssignments, useCourses, useTheme} from '@state';
import Feather from 'react-native-vector-icons/Feather';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Button, Checkbox, DateTimePickerModal} from '@components';
import Day from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';

Day.extend(advancedFormat);

type Props = {
  sheetRef: React.RefObject<BottomSheet>;
  setAssignment?: (assignment: Assignment | undefined) => void;
  assignment?: Assignment;
};

/**
 * Render the add assignment modal
 * @param sheetRef ref to be applied to the BottomSheet
 * @param assignment the assignment to update (or undefined if creating an assignment)
 * @param setAssignment set the new assignment
 * @constructor
 */
export const AddAssignmentModal: FunctionComponent<Props> = ({
  sheetRef,
  assignment,
  setAssignment,
}) => {
  const {theme, spacing} = useTheme();
  const insets = useSafeAreaInsets();
  const {courses} = useCourses();
  const {addAssignment, updateAssignment, deleteAssignment} = useAssignments();

  const [selectedCourseId, setSelectedCourseId] = useState<string | undefined>(
    undefined,
  );

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingDelete, setIsLoadingDelete] = useState<boolean>(false);

  const [title, setTitle] = useState<string>('');
  const [dueDate, setDueDate] = useState<Day.Dayjs | undefined>(undefined);
  const [datePickerIsOpen, setDatePickerIsOpen] = useState<boolean>(false);
  const [description, setDescription] = useState<string | undefined>(undefined);

  const chooseCourseSheetRef = useRef<BottomSheet>(null);
  const [descriptionHeight, setDescriptionHeight] = useState<number>(20);

  const isEdit = useMemo(() => !!assignment, [assignment]);

  useEffect(() => {
    if (assignment) {
      setTitle(assignment.title);
      setDescription(assignment.description);
      setDueDate(assignment.dueDate);
      setSelectedCourseId(assignment.course.id);
    } else {
      setTitle('');
      setDescription(undefined);
      setDueDate(undefined);
      setSelectedCourseId(undefined);
    }
  }, [assignment]);

  const snapPoints = useMemo(
    () => [90 + insets.bottom, 330 + insets.bottom + descriptionHeight],
    [descriptionHeight],
  );

  const openCourseSheet = useCallback(() => {
    Keyboard.dismiss();
    sheetRef?.current?.snapToIndex(1);
    chooseCourseSheetRef.current?.expand();
  }, []);

  const handleSheetChanges = useCallback((index: number) => {
    if (index === -1) {
      setAssignment?.(undefined);
      Keyboard.dismiss();
    }
  }, []);

  const renderBackdrop = useCallback(
    props => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={1}
      />
    ),
    [],
  );

  return (
    <>
      <BottomSheet
        ref={sheetRef}
        enablePanDownToClose={true}
        index={-1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        backdropComponent={renderBackdrop}
        containerStyle={{
          zIndex: 10,
          shadowColor: theme?.text,
          shadowOffset: {
            width: 0,
            height: -5,
          },
          shadowOpacity: 0.12,
          shadowRadius: 4.65,

          elevation: 7,
        }}
        handleStyle={{
          backgroundColor: theme?.background,
          borderTopRightRadius: 12,
          borderTopLeftRadius: 12,
        }}>
        <View
          style={{
            backgroundColor: theme?.background,
            flex: 1,
            zIndex: 1000,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: spacing.lg,
              marginHorizontal: spacing.lg,
            }}>
            <BottomSheetTextInput
              value={title}
              onChangeText={txt => setTitle(txt)}
              onSubmitEditing={() => {
                openCourseSheet();
              }}
              placeholder={'Assignment Title'}
              placeholderTextColor={theme?.label}
              style={{
                flex: 1,
                marginRight: spacing.reg,
                fontSize: 24,
                lineHeight: 28,
                color: theme?.subtitle,
              }}
            />
            <View
              style={{
                minWidth: isEdit ? 150 : 80,
                flexDirection: 'row',
                alignItems: 'flex-end',
                justifyContent: 'space-between',
              }}>
              <Button
                onPress={async () => {
                  if (!dueDate || !selectedCourseId || !title || !courses) {
                    Alert.alert(
                      'Please fill out the title, course, and due date field.',
                    );
                    return;
                  }
                  setIsLoading(true);
                  if (isEdit && assignment) {
                    await updateAssignment!(assignment.id, {
                      id: assignment.id,
                      title,
                      dueDate,
                      description,
                      course: courses.filter(
                        course => course.id === selectedCourseId,
                      )[0],
                      completed: false,
                    });
                  } else {
                    try {
                      await addAssignment!({
                        title,
                        dueDate,
                        description,
                        course: courses.filter(
                          course => course.id === selectedCourseId,
                        )[0],
                        completed: false,
                      });
                    } catch (e) {
                      console.log(e);
                    }
                  }
                  setIsLoading(false);
                  sheetRef?.current?.close();
                }}
                type={ButtonTypes.SMALL}
                text={isEdit ? 'Update' : 'Add'}
                isLoading={isLoading}
              />
              {isEdit && assignment && (
                <Button
                  onPress={async () => {
                    setIsLoadingDelete(true);
                    try {
                      console.log(assignment.id);
                      await deleteAssignment!(assignment.id);
                    } catch (e) {
                      console.log(e);
                    }
                    setIsLoadingDelete(false);
                    sheetRef?.current?.close();
                  }}
                  type={ButtonTypes.SMALL}
                  text={'Delete'}
                  destructive={true}
                  isLoading={isLoadingDelete}
                />
              )}
            </View>
          </View>
          <View style={{marginTop: spacing.xl, marginHorizontal: spacing.lg}}>
            <TouchableOpacity
              onPress={() => {
                openCourseSheet();
              }}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Feather
                  color={theme?.label}
                  size={16}
                  name={'book'}
                  style={{marginRight: spacing.md}}
                />
                <Text
                  truncate={true}
                  type={selectedCourseId ? TextTypes.BOLD : TextTypes.DESC}>
                  {selectedCourseId
                    ? courses?.filter(
                        course => course.id === selectedCourseId,
                      )[0].name
                    : 'Choose Course'}
                </Text>
              </View>
              <Feather color={theme?.label} size={20} name={'chevron-right'} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setDatePickerIsOpen(true)}
              style={{
                marginTop: spacing.reg,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Feather
                  color={theme?.label}
                  size={16}
                  name={'calendar'}
                  style={{marginRight: spacing.md}}
                />
                <Text
                  truncate={true}
                  type={dueDate ? TextTypes.BOLD : TextTypes.DESC}>
                  {dueDate
                    ? dueDate.format('ddd, MMM Do YYYY @ h:mma')
                    : 'Add Due Date'}
                </Text>
              </View>
              <Feather color={theme?.label} size={20} name={'chevron-right'} />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                marginTop: spacing.reg,
                flexDirection: 'row',
              }}>
              <Feather
                color={theme?.label}
                size={16}
                name={'menu'}
                style={{marginRight: spacing.md, marginTop: 2}}
              />
              <BottomSheetTextInput
                onSubmitEditing={() => {}}
                value={description}
                onChangeText={text => {
                  setDescription(text);
                }}
                placeholder={'Assignment Description'}
                placeholderTextColor={theme?.subtitle}
                multiline={true}
                onContentSizeChange={({nativeEvent: {contentSize}}) => {
                  setDescriptionHeight(contentSize.height);
                }}
                style={{
                  flex: 1,
                  marginRight: spacing.reg,
                  marginLeft: -2,
                  paddingLeft: 2,
                  paddingTop: 0,
                  fontSize: description ? 16 : 14,
                  lineHeight: description ? 20 : 18,
                  color: theme?.subtitle,
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </BottomSheet>

      <DateTimePickerModal
        pickerProps={{
          onDateConfirm: date => {
            setDueDate(date ?? undefined);
          },
          selectedDate: dueDate,
          minimumDate: Day(),
        }}
        isVisible={datePickerIsOpen}
        onBackdropPress={() => {
          setDatePickerIsOpen(false);
        }}
      />
      <BottomSheet
        ref={chooseCourseSheetRef}
        enablePanDownToClose={true}
        index={-1}
        snapPoints={[320 + insets.bottom]}
        onChange={handleSheetChanges}
        containerStyle={{
          zIndex: 100,
        }}
        backdropComponent={renderBackdrop}
        handleStyle={{
          backgroundColor: theme?.background,
          borderTopRightRadius: 12,
          borderTopLeftRadius: 12,
        }}>
        <View
          style={{
            flex: 1,
            paddingTop: spacing.md,
            paddingHorizontal: spacing.reg,
            backgroundColor: theme?.background,
          }}>
          <FlatList
            data={courses}
            renderItem={({item}) => (
              <CourseChecklistItem
                selectedCourseId={selectedCourseId}
                setSelectedCourseId={id => {
                  chooseCourseSheetRef.current?.close();
                  setSelectedCourseId(id);
                }}
                key={item.id}
                item={item}
              />
            )}
          />
        </View>
      </BottomSheet>
    </>
  );
};

type CourseChecklistItemProps = {
  item: Course;
  selectedCourseId: string | undefined;
  setSelectedCourseId: (courseId: string | undefined) => void;
};

const CourseChecklistItem: FunctionComponent<CourseChecklistItemProps> = ({
  item,
  selectedCourseId,
  setSelectedCourseId,
}) => {
  const {theme, spacing} = useTheme();

  return (
    <TouchableOpacity
      onPress={() => {
        setSelectedCourseId(selectedCourseId === item.id ? undefined : item.id);
      }}
      style={{
        paddingVertical: spacing.md,
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}>
      <View style={{flexDirection: 'row'}}>
        <Checkbox
          onPress={() => {
            setSelectedCourseId(
              selectedCourseId === item.id ? undefined : item.id,
            );
          }}
          isChecked={selectedCourseId === item.id}
        />
        <Text
          style={{
            color: item.color.toLowerCase(),
          }}
          type={TextTypes.TEXT}>
          {item.name}
        </Text>
      </View>

      <View
        style={{
          maxWidth: 80,
          justifyContent: 'center',
          alignItems: 'flex-end',
        }}>
        <View
          style={{
            width: 16,
            height: 16,
            borderRadius: 4,
            borderColor: item.color.toLowerCase(),
            borderWidth: 3,
          }}
        />
      </View>
    </TouchableOpacity>
  );
};
