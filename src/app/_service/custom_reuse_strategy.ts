import {
    ActivatedRouteSnapshot,
    DetachedRouteHandle,
    RouteReuseStrategy
  } from "@angular/router";
  import { ComponentRef } from "@angular/core";
  
  interface StoredRoute {
    route: ActivatedRouteSnapshot;
    handle: DetachedRouteHandle;
  }
  
  /**
   * Returns the full Path of a route, as a string
   */
  export function getFullPath(route: ActivatedRouteSnapshot): string {
    return route.pathFromRoot
      .map(v => v.url.map(segment => segment.toString()).join("/"))
      .join("/")
      .trim()
      .replace(/\/$/, ""); // Remove trailing slash
  }
  
  export class CustomReuseStrategy implements RouteReuseStrategy {
    storedRoutes: Record<string, StoredRoute> = {};
  
    // Should we store the route? Defaults to false.
    shouldDetach(route: ActivatedRouteSnapshot): boolean {
      return !!route.data.storeRoute;
    }
  
    // Store the route
    store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
      // Ex. users/1, users/2, users/3, ...
      const key = getFullPath(route);
      this.storedRoutes[key] = { route, handle };
    }
  
    // Should we retrieve a route from the store?
    shouldAttach(route: ActivatedRouteSnapshot): boolean {
      const key = getFullPath(route);
      const isStored = !!route.routeConfig && !!this.storedRoutes[key];
  
      if (isStored) {
        // Compare params and queryParams.
        // Params, however, have already been compared because the key includes them.
        const paramsMatch = this.compareObjects(
          route.params,
          this.storedRoutes[key].route.params
        );
        const queryParamsMatch = this.compareObjects(
          route.queryParams,
          this.storedRoutes[key].route.queryParams
        );
  
        return paramsMatch && queryParamsMatch;
      }
      return false;
    }
  
    // Retrieve from the store (just the Handle)
    retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle {
      const key = getFullPath(route);
      if (!route.routeConfig || !this.storedRoutes[key]) return null as any;
      return this.storedRoutes[key].handle;
    }
  
    // Should the route be reused?
    shouldReuseRoute(
      previous: ActivatedRouteSnapshot,
      next: ActivatedRouteSnapshot
    ): boolean {
      const isSameConfig = previous.routeConfig === next.routeConfig;
      const shouldReuse = !next.data.noReuse;
      return isSameConfig && shouldReuse;
    }
  
    // Simple object comparison (from StackOverflow, needs to be double-checked)
    // Feel free to use a library!
    private compareObjects(a: any, b: any): boolean {
      // loop through all properties in base object
      for (let prop in a) {
        // determine if comparrison object has that property, if not: return false
        if (b.hasOwnProperty(prop)) {
          switch (typeof a[prop]) {
            // if one is object and other is not: return false
            // if they are both objects, recursively call this comparison function
            case "object":
              if (
                typeof b[prop] !== "object" ||
                !this.compareObjects(a[prop], b[prop])
              ) {
                return false;
              }
              break;
            // if one is function and other is not: return false
            // if both are functions, compare function.toString() results
            case "function":
              if (
                typeof b[prop] !== "function" ||
                a[prop].toString() !== b[prop].toString()
              ) {
                return false;
              }
              break;
            // otherwise, see if they are equal using coercive comparison
            default:
              if (a[prop] != b[prop]) {
                return false;
              }
          }
        } else {
          return false;
        }
      }
      return true;
    }
  
    /**
     * Destroys the components of all stored routes (resets the strategy).
     */
    // clearAllRoutes() {
    //   for (const key in this.storedRoutes) {
    //     this.destroyComponent(this.storedRoutes[key].handle);
    //   }
    //   this.storedRoutes = {};
    // }
  
    // /**
    //  * Destroys the component of a particular route.
    //  */
    // clearRoute(fullPath: string) {
    //   this.destroyComponent(this.storedRoutes[fullPath].handle);
    //   this.storedRoutes[fullPath] = undefined;
    // }
  
    // /**
    //  * A bit of a hack: manually destroy a particular component.
    //  */
    // private destroyComponent(handle: DetachedRouteHandle): void {
    //   const componentRef: ComponentRef<any> = handle && handle["componentRef"];
    //   if (componentRef) {
    //     componentRef.destroy();
    //   }
    // }
  }
  