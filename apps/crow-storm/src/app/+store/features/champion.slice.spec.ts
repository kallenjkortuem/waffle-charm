import {
  fetchChampion,
  championAdapter,
  championReducer,
} from './champion.slice'

describe('champion reducer', () => {
  it('should handle initial state', () => {
    const expected = championAdapter.getInitialState({
      loadingStatus: 'not loaded',
      error: null,
    })

    expect(championReducer(undefined, { type: '' })).toEqual(expected)
  })

  it('should handle fetchChampions', () => {
    let state = championReducer(undefined, fetchChampion.pending(null, null))

    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: 'loading',
        error: null,
        entities: {},
      })
    )

    state = championReducer(
      state,
      fetchChampion.fulfilled([{ id: 1 }], null, null)
    )

    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: 'loaded',
        error: null,
        entities: { 1: { id: 1 } },
      })
    )

    state = championReducer(
      state,
      fetchChampion.rejected(new Error('Uh oh'), null, null)
    )

    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: 'error',
        error: 'Uh oh',
        entities: { 1: { id: 1 } },
      })
    )
  })
})
