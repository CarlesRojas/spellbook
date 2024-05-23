export type NonNullableFields<T> = {
    [P in keyof T]: NonNullable<T[P]>;
};

export type NonNullableField<T, K extends keyof T> = T & NonNullableFields<Pick<T, K>>;
export type RequiredField<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;

export type NonNullableRequiredField<T, K extends keyof T> = NonNullableField<RequiredField<T, K>, K>;

export type ArrayWith20Positions<T> = [T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T];
