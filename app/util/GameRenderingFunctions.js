export default {
  changeFrame(activeGameState, eventCount) {
    const nextFrame = activeGameState.currentFrame + 1;
    const isValidIndex = nextFrame >= 0 && nextFrame <= eventCount;
    if (!isValidIndex) {
      return;
    }

    activeGameState.currentFrame = nextFrame;
  },
};
