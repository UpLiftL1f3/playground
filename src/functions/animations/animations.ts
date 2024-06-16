import Animation from "react-native-reanimated";

declare let _WORKLET: boolean;

interface AnimationState {
    current: number;
}

interface PhysicsAnimationState extends AnimationState {
    velocity: number;
}

type Animation<
    State extends AnimationState = AnimationState,
    PrevState extends AnimationState = AnimationState
> = {
    animation: (animation: State, now: number) => boolean;
    start: (
        animation: State,
        value: number,
        now: number,
        lastAnimation: PrevState
    ) => void;
} & State;

type AnimationParameter<State extends AnimationState = AnimationState> =
    | Animation<State>
    | (() => Animation<State>)
    | number;

const AnimationParameter = <State extends AnimationState = AnimationState>(
    animationParam: AnimationParameter<State>
) => {
    "worklet";
    if (typeof animationParam === "number") {
        throw new Error("Expected Animation as parameter");
    }

    return typeof animationParam == "function"
        ? animationParam()
        : animationParam;
};

const defineAnimation = <
    S extends AnimationState = AnimationState,
    Prev extends AnimationState = AnimationState
>(
    factory: () => Omit<Animation<S, Prev>, keyof S>
) => {
    "worklet";
    if (_WORKLET) {
        return factory() as unknown as number;
    }
    return factory as unknown as number;
};

interface DecayAnimationState extends PhysicsAnimationState {
    lastTimestamp: number;
}

const VELOCITY_EPS = 5;
const deceleration = 0.997;

export const withDecay = (initialVelocity: number) => {
    "worklet";
    return defineAnimation<DecayAnimationState>(() => {
        "worklet";
        const animation = (state: DecayAnimationState, now: number) => {
            const { velocity, lastTimestamp, current } = state;
            const deltaTime = now - lastTimestamp;
            const v0 = velocity / 1000;
            const kv = Math.pow(deceleration, deltaTime);
            const v = v0 * kv * 1000;

            const x =
                current + (v0 * deceleration * (1 - kv)) / (1 - deceleration);

            state.velocity = v;
            state.current = x;
            state.lastTimestamp = now;

            if (Math.abs(v) < VELOCITY_EPS) {
                return true;
            }
            return false;
        };
        const start = (
            state: DecayAnimationState,
            current: number,
            now: number
        ) => {
            state.current = current;
            state.velocity = initialVelocity;
            state.lastTimestamp = now;
        };

        return {
            animation,
            start,
        };
    });
};

export const withBounce = (
    animationParam: AnimationParameter<PhysicsAnimationState>,
    lowerBound: number,
    upperBound: number
) => {
    "worklet";
    return defineAnimation<PhysicsAnimationState>(() => {
        "worklet";

        const nextAnimation = AnimationParameter(animationParam);
        const animation = (state: PhysicsAnimationState, now: number) => {
            const finished = nextAnimation.animation(state, now);
            const { velocity, current } = nextAnimation;

            if (
                (velocity < 0 && current < lowerBound) ||
                (velocity > 0 && current > upperBound)
            ) {
                nextAnimation.velocity *= -1;
            }

            state.current = current;

            return finished;
        };

        const start = (
            _state: PhysicsAnimationState,
            value: number,
            now: number,
            previousAnimation: any
        ) => {
            nextAnimation.start(nextAnimation, value, now, previousAnimation);
        };

        return {
            animation,
            start,
        };
    });
};
