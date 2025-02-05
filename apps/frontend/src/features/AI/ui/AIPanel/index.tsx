import { QuestionForm } from "../QuestionForm";

const [question, answer] = [
  "React에서 상태 관리를 할 때 useState와 useReducer 중 어떤 것을 선택해야 할지 고민이 됩니다. 저는 단순한 상태 변화에는 useState가 적합하다는 것을 알고 있지만, useReducer를 사용해야 하는 적절한 상황이 정확히 무엇인지 알고 싶습니다.",
  "React에서 상태를 관리할 때 useState와 useReducer는 각각 적절한 상황에서 사용될 수 있습니다. 먼저, useState는 단순한 상태 값을 관리할 때 적합합니다. 예를 들어, 사용자가 버튼을 클릭하면 true와 false 사이를 전환하는 토글 상태나, 단순한 입력 필드 값을 변경하는 경우에는 useState를 사용하는 것이 코드가 직관적이고 간결합니다. 반면에, useReducer는 상태가 여러 개로 구성되어 있거나 상태 변경 로직이 복잡한 경우에 더 적합합니다. 예를 들어, 로그인 상태를 관리하면서 동시에 오류 메시지를 표시해야 하는 경우에는 단순한 useState 여러 개로 상태를 관리하는 것보다 useReducer를 사용하여 상태 변화 로직을 하나의 흐름으로 관리하는 것이 더 효율적일 수 있습니다. 또한, 장바구니와 같은 기능을 구현할 때도 useReducer가 유용합니다. 사용자가 상품을 추가하거나 삭제할 때마다 상태를 변경해야 하는데, useReducer를 사용하면 액션을 정의하여 상태 업데이트 로직을 한 곳에서 관리할 수 있습니다.useReducer를 사용하면 코드가 복잡해지는 것처럼 보일 수도 있지만, 상태 변경 로직을 한 곳에서 통제할 수 있기 때문에 장기적으로는 유지보수가 쉬워지는 장점이 있습니다. 또한, 상태 변경 시 dispatch를 호출하는 방식이기 때문에 불필요한 상태 변경을 방지할 수도 있습니다. 특히, useContext와 함께 useReducer를 사용하면 여러 컴포넌트에서 동일한 상태를 공유할 수 있기 때문에 전역 상태 관리에도 효과적입니다.결론적으로, 단순한 상태 관리는 useState를 사용하고, 상태가 복잡하거나 여러 개의 상태가 하나의 흐름으로 관리되어야 하는 경우에는 useReducer를 사용하는 것이 더 좋은 선택이 될 수 있습니다.",
];

export function AIPanel() {
  return (
    <div className="z-8 absolute left-0 top-full mt-2 flex h-[720px] w-[500px] flex-col items-center rounded-md border-[1px] border-neutral-200 bg-white p-4 text-black shadow-md">
      <QuestionForm />

      <div className="mt-4 flex w-full flex-grow overflow-y-auto px-4">
        {question ? (
          <div className="text-md">
            <div className="font-bold">{question}</div>
            <hr className="my-3" />
            <div className="font-light">{answer}</div>
          </div>
        ) : (
          <div className="text-md flex h-full w-full items-center justify-center text-center font-medium">
            문서에서 원하는 정보를 찾아드릴게요.
            <br />
            질문을 입력해 주세요!
          </div>
        )}
      </div>
    </div>
  );
}
