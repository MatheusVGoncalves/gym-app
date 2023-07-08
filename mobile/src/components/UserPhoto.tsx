import { Image, IImageProps } from "native-base";

type Props = IImageProps & {
    size: number;
}

export function UserPhoto({size, ...rest}: Props) {
    return(
        <Image
        w={size}
        h={size}
        rounded='full'
        borderWidth={2}
        borderColor='gray.400'
        alt='imagem do usuário'
        mr={4}
        {...rest}
        />
    )
}