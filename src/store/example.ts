import { create } from "zustand";
import {
  combine,
  subscribeWithSelector,
  persist,
  createJSONStorage,
  devtools,
} from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

// create = { state, actions }
// middleware
// + combine -> state + action 합치기 / type 추론
// + immer -> 불변성 자동 처리, 상태 직접 수정하듯 사용 가능
// + subscribeWithSelector -> subscribe (selector / listener)
// + persist -> store를 브라우저(storage)에 저장, state 값 유지
// + devtools -> 개발자 도구에서 디버깅
export const useCountStore = create(
  devtools(
    persist(
      subscribeWithSelector(
        immer(
          combine({ count: 0 }, (set) => ({
            actions: {
              increase: () => {
                set((state) => {
                  state.count += 1;
                });
              },
              decrease: () => {
                set((state) => {
                  state.count -= 1;
                });
              },
            },
          })),
        ),
      ),
      {
        name: "countStore",
        partialize: (store) => ({
          count: store.count,
        }),
        storage: createJSONStorage(() => sessionStorage),
      },
    ),
    {
      name: "countStore",
    },
  ),
);

// subscribe -> store의 state가 바뀔 때마다 listener 함수를 실행
// side effect로 주로 사용
useCountStore.subscribe(
  // selector
  (store) => store.count,
  // listener
  (count, prevCount) => {
    console.log(prevCount, "->", count);
    const store = useCountStore.getState();
    console.log("[store]", store);
  },
);

// custom hook
export const useCount = () => {
  const count = useCountStore((store) => store.count);
  return count;
};

export const useIncreaseCount = () => {
  const increase = useCountStore((store) => store.actions.increase);
  return increase;
};

export const useDecreaseCount = () => {
  const decrease = useCountStore((store) => store.actions.decrease);
  return decrease;
};
