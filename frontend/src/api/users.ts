import { get, handleAPIError, post } from "src/api/requests";

import type { APIResult } from "src/api/requests";

/**
 * Defines the "shape" of a Task object (what fields are present and their types) for
 * frontend components to use. This will be the return type of most functions in this
 * file.
 */
export interface User {
  _id: string;
  name: string;
  profilePictureURL?: string;
}

/**
 * The expected inputs when we want to create a new User object.
 */
export interface CreateUserRequest {
  name: string;
  profilePictureURL?: string;
}

/**
 * The expected inputs when we want to update an existing User object. Similar to
 * `CreateUserRequest`.
 */
export interface UpdateUserRequest {
  _id: string;
  name: string;
  profilePictureURL?: string;
}

export async function createUser(user: CreateUserRequest): Promise<APIResult<User>> {
  try {
    const response = await post("/api/user", user);
    const json = await response.json();
    return { success: true, data: json };
  } catch (error) {
    return handleAPIError(error);
  }
}

export async function getUser(id: string): Promise<APIResult<User>> {
  try {
    const response = await get(`/api/user/${id}`);
    const json = await response.json();
    return { success: true, data: json };
  } catch (error) {
    return handleAPIError(error);
  }
}
