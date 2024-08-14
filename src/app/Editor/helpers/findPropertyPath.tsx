import { ITarget } from "../types";

export const findPropertyPath = (obj: any, target: ITarget): string => {
  const find = (obj: any, target: ITarget, path: string[]): string | null => {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const value = obj[key];
        const newPath = path.concat(key);

        if (key == target.property && value == target.propertyValue) {
          debugger
          return newPath.join(".");
        }

        if (typeof value === "object" && value !== null) {
          if (Array.isArray(value)) {
            for (let i = 0; i < value.length; i++) {
              const itemPath = newPath.concat(`[${i}]`);
              const result: string | null = find(value[i], target, itemPath);
              if (result) {
                return result;
              }
            }
          } else {
            const result: string | null = find(value, target, newPath);
            if (result) {
              return result;
            }
          }
        }
      }
    }
    return null;
  };

  const result = find(obj, target, []);
  return "data." + result?.replaceAll(/\.\[/g, "[");
};
