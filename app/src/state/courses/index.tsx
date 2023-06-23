import React, {useContext, useEffect, useRef, useState} from 'react';
import {Course} from '@types';
import {reject} from 'lodash';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {DUMMY_COURSES, ORIGIN, useOneTimeFunction} from 'tools';

interface CourseContext {
  courses: Course[] | null;
  setCourses: (courses: Course[]) => void;
  addCourse: (course: Course) => Promise<undefined>;
  deleteCourse: (id: number | undefined) => Promise<undefined>;
  updateCourse: (id: number | undefined, course: Course) => Promise<undefined>;
  fetchCourses: () => Promise<Course[] | null>;
  clearCourses: () => void;
}

const CourseContext = React.createContext<Partial<CourseContext>>({});

/**
 * Create dummy courses for user given dummy course data
 * @param courses
 */
const createDummyCourses = async (courses: Course[]) => {
  try {
    const token = await auth().currentUser?.getIdToken();

    let proms: Promise<Response>[] = [];
    courses.forEach(course => {
      proms.push(
        fetch(`${ORIGIN}/api/courses`, {
          method: 'POST',
          headers: {
            Authorization: 'Bearer ' + token,
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({name: course.name, color: course.color}),
        }),
      );
    });
    await Promise.all(proms);
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};

/**
 * Provide CRUD operations for courses
 * @param children
 * @constructor
 */
export const CourseProvider: React.FunctionComponent = ({children}) => {
  const [courses, setCourses] = useState<Course[] | null>(null);

  const initializeDummyCourses = useOneTimeFunction(() => {
    createDummyCourses(DUMMY_COURSES).then(resp => {
      if (resp) {
        setCourses(DUMMY_COURSES);
      }
    });
  });

  // Handle user.helpers.ts state changes
  const onAuthStateChanged: FirebaseAuthTypes.AuthListenerCallback =
    async user => {
      if (user) {
        console.log('FETCH');
        await fetchCourses();
      }
    };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  /**
   * Clear all course data in state, resetting it back to initial state
   */
  const clearCourses = () => {
    setCourses([]);
  };

  /**
   * Given a new course, add it to database and update the state
   * @param course {Course} the course to add
   */
  const addCourse = async (course: Course): Promise<undefined> => {
    return Promise.resolve(undefined);
  };

  /**
   * Given an id, delete the course at the given id and update state
   * @param id
   */
  const deleteCourse = async (id: number | undefined): Promise<undefined> => {
    if (!id) {
      reject('No ID Provided');
      return;
    }
  };

  /**
   * Given the course id and the new course object, update the course -> and all
   * work associated with it -> in database and update state in app
   * @param id {number} the id of the course to update
   * @param course {Course} the new course object with updated values
   */
  const updateCourse = async (
    id: number | undefined,
    course: Course,
  ): Promise<undefined> => {
    if (!id) {
      reject('No ID Provided');
      return;
    }
  };

  /**
   * Fetch all courses, if user.helpers.ts subbed, from all devices, else from just this device
   */
  const fetchCourses = async (): Promise<Course[] | null> => {
    fetch(`${ORIGIN}/api/courses`, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + (await auth().currentUser?.getIdToken()),
        Accept: 'application/json',
      },
    })
      .then(res => res.json())
      .then(res => {
        if (res && res?.length >= 0) {
          if ((res?.length ?? 1) === 0) {
            if (auth().currentUser?.uid) {
              initializeDummyCourses();
            }
          } else {
            setCourses(res);
          }
        }
      });
    return null;
  };

  return (
    <CourseContext.Provider
      value={{
        courses,
        setCourses,
        addCourse,
        deleteCourse,
        updateCourse,
        fetchCourses,
        clearCourses,
      }}>
      {children}
    </CourseContext.Provider>
  );
};

export const useCourses = () => useContext(CourseContext);
