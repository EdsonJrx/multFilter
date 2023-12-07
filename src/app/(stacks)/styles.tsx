import styled from 'styled-components/native'

export const Container = styled.View`
    flex: 1;
    align-items: center;
    justify-content: start;
	gap:15px;
    background: ${({ theme }) => theme.COLORS.BACKGROUND};
    padding-top:15px;
`
export const Title = styled.Text`
    font-size: 20px;
`