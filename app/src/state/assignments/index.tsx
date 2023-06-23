import React, {useContext, useEffect, useState} from 'react';
import {Assignment} from '@types';
import {reject} from 'lodash';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import Day from 'dayjs';
import {ORIGIN} from 'tools';

interface AssignmentContext {
  assignments: Assignment[] | null;
  setAssignments: (assignments: Assignment[]) => void;
  addAssignment: (assignment: Assignment) => Promise<undefined>;
  deleteAssignment: (id: string | undefined) => Promise<undefined>;
  updateAssignment: (
    id: string | undefined,
    assignment: Assignment,
  ) => Promise<undefined>;
  fetchAssignments: () => Promise<Assignment[] | null>;
  clearAssignments: () => void;
}

const AssignmentContext = React.createContext<Partial<AssignmentContext>>({});

/**
 * Provide CRUD operations for assignments
 * @param children
 * @constructor
 */
export const AssignmentProvider: React.FunctionComponent = ({children}) => {
  const [assignments, setAssignments] = useState<Assignment[] | null>(null);

  // Handle user.helpers.ts state changes
  const onAuthStateChanged: FirebaseAuthTypes.AuthListenerCallback =
    async user => {
      if (user) {
        await fetchAssignments();
      }
    };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  /**
   * Clear all assignment data in state, resetting it back to initial state
   */
  const clearAssignments = () => {
    setAssignments([]);
  };

  /**
   * Given a new assignment, add it to database and update the state
   * @param assignment {Assignment} the assignment to add
   */
  const addAssignment = async (assignment: Assignment): Promise<undefined> => {
    return new Promise(async (resolve, reject) => {
      fetch(`${ORIGIN}/api/assignments`, {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + (await auth().currentUser?.getIdToken()),
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(assignment),
      })
        .then(res => res.json())
        .then(res => {
          if (res) {
            console.log('RES: ', res);
            res.dueDate = Day(res.dueDate);
            assignment.id = res.id;
            console.log('ID: ', assignment.id);
            setAssignments([...(assignments ?? []), assignment]);
            resolve(res);
            return;
          }
        })
        .catch(err => reject(err));
    });
  };

  /**
   * Given an id, delete the assignment at the given id and update state
   * @param id
   */
  const deleteAssignment = async (
    id: string | undefined,
  ): Promise<undefined> => {
    return new Promise(async (resolve, reject) => {
      console.log(id);
      if (!id) {
        reject('No ID Provided');
        return;
      }

      fetch(`${ORIGIN}/api/assignments`, {
        method: 'DELETE',
        headers: {
          Authorization: 'Bearer ' + (await auth().currentUser?.getIdToken()),
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({id}),
      })
        .then(() => {
          setAssignments(assignments =>
            (assignments ?? [])?.filter(assignment => assignment.id !== id),
          );
          resolve(undefined);
          return;
        })
        .catch(err => reject(err));
    });
  };

  /**
   * Given the assignment id and the new assignment object, update the assignment -> and all
   * work associated with it -> in database and update state in app
   * @param id {number} the id of the assignment to update
   * @param assignment {Assignment} the new assignment object with updated values
   */
  const updateAssignment = async (
    id: string | undefined,
    assignment: Assignment,
  ): Promise<undefined> => {
    return new Promise(async (resolve, reject) => {
      fetch(`${ORIGIN}/api/assignments`, {
        method: 'PATCH',
        headers: {
          Authorization: 'Bearer ' + (await auth().currentUser?.getIdToken()),
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(assignment),
      })
        .then(res => res.json())
        .then(res => {
          if (res) {
            res.dueDate = Day(res.dueDate);
            assignment.id = res.id;
            setAssignments(
              (assignments ?? []).map(item => {
                if (item.id === id) {
                  return assignment;
                } else {
                  return item;
                }
              }),
            );
            resolve(res);
            return;
          }
        })
        .catch(err => reject(err));
    });
  };

  /**
   * Fetch all assignments, if user.helpers.ts subbed, from all devices, else from just this device
   */
  const fetchAssignments = async (): Promise<Assignment[] | null> => {
    return new Promise(async (resolve, reject) => {
      fetch(`${ORIGIN}/api/assignments`, {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + (await auth().currentUser?.getIdToken()),
          Accept: 'application/json',
        },
      })
        .then(res => res.json())
        .then(res => {
          if (res && res?.length >= 0) {
            res = res.map((item: any) => {
              console.log(item);
              return {
                ...item,
                dueDate: Day(item.dueDate),
              };
            });
            setAssignments(res);
            resolve(res);
            return;
          }
        })
        .catch(err => reject(err));
      return null;
    });
  };

  return (
    <AssignmentContext.Provider
      value={{
        assignments,
        setAssignments,
        addAssignment,
        deleteAssignment,
        updateAssignment,
        fetchAssignments,
        clearAssignments,
      }}>
      {children}
    </AssignmentContext.Provider>
  );
};

export const useAssignments = () => useContext(AssignmentContext);
